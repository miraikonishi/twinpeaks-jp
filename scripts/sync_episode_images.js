
import fs from 'fs';
import path from 'path';
import https from 'https';
import { database } from '../src/data.js';

// Function to download image
const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(filepath, () => { });
                reject(`Server responded with ${response.statusCode}: ${url}`);
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
};

// Function to fetch HTML content
const fetchHtml = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', (err) => reject(err));
    });
};

async function main() {
    const publicDir = path.resolve('public');
    const studies = database.studies;
    const updates = [];

    console.log(`Processing ${studies.length} episodes...`);

    for (const episode of studies) {
        // Infer URL if missing
        const url = episode.url || `https://twinpeaks.jp/studies/${episode.id}/`;

        try {
            console.log(`Fetching ${url}...`);
            const html = await fetchHtml(url);

            // Try to find the featured image
            // 1. Check for og:image
            let imageUrl = null;
            const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
            if (ogMatch) {
                imageUrl = ogMatch[1];
            }

            // 2. If no og:image, try first image in article body or post-thumbnail
            if (!imageUrl) {
                const imgMatch = html.match(/<img[^>]+src="([^"]+)"[^>]*class="[^"]*wp-post-image"/);
                if (imgMatch) imageUrl = imgMatch[1];
            }

            if (imageUrl) {
                // Determine local path
                // Use the filename from the URL, but prefix with episode id to avoid collisions if names are generic
                const ext = path.extname(imageUrl);
                const filename = `${episode.id}_thumb${ext}`;
                const relativePath = `/images/episodes/${filename}`;
                const localPath = path.join(publicDir, 'images', 'episodes', filename);
                const localDir = path.dirname(localPath);

                if (!fs.existsSync(localDir)) {
                    fs.mkdirSync(localDir, { recursive: true });
                }

                // Always download to ensure we have the right file
                console.log(`Downloading: ${imageUrl} -> ${localPath}`);
                await downloadImage(imageUrl, localPath);

                // Store update
                if (episode.image !== relativePath) {
                    updates.push({
                        id: episode.id,
                        oldImage: episode.image,
                        newImage: relativePath
                    });
                }
            } else {
                console.log(`Could not find image for ${episode.title}`);
            }

            // Be nice to the server
            await new Promise(r => setTimeout(r, 500));

        } catch (err) {
            console.error(`Error processing ${episode.id}: ${err.message}`);
        }
    }

    // Generate a JSON file with updates to be applied
    fs.writeFileSync('episode_image_updates.json', JSON.stringify(updates, null, 2));
    console.log(`Found ${updates.length} updates. Written to episode_image_updates.json`);
}

main();
