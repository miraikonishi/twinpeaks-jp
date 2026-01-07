
import fs from 'fs';
import path from 'path';
import https from 'https';
import { database } from '../src/data.js';

// Helper to extract image URLs from content string
function extractImagesFromContent(content) {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}

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
                fs.unlink(filepath, () => { }); // Delete empty file
                reject(`Server responded with ${response.statusCode}: ${url}`);
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
};

async function main() {
    const publicDir = path.resolve('public');
    const missingFiles = [];

    // 1. Gather all image paths
    const allImagePaths = new Set();

    for (const category of Object.values(database)) {
        if (Array.isArray(category)) {
            for (const item of category) {
                if (item.image) allImagePaths.add(item.image);
                if (item.content) {
                    const contentImages = extractImagesFromContent(item.content);
                    contentImages.forEach(img => allImagePaths.add(img));
                }
            }
        }
    }

    console.log(`Checking ${allImagePaths.size} unique image paths...`);

    // 2. Check existence and download if missing
    for (const imgPath of allImagePaths) {
        if (!imgPath.startsWith('/images/')) continue; // Skip external or weird paths

        const localPath = path.join(publicDir, imgPath);
        const localDir = path.dirname(localPath);

        if (!fs.existsSync(localPath)) {
            console.log(`Missing: ${imgPath}`);

            // Ensure directory exists
            if (!fs.existsSync(localDir)) {
                fs.mkdirSync(localDir, { recursive: true });
            }

            // Download from live site
            const liveUrl = `https://twinpeaks.jp${imgPath}`;
            try {
                await downloadImage(liveUrl, localPath);
                console.log(`Downloaded: ${imgPath}`);
            } catch (err) {
                console.error(`Failed to download ${imgPath}: ${err}`);
                missingFiles.push(imgPath);
            }
        }
    }

    console.log('--------------------------------------------------');
    console.log(`Verification complete. Failed to download ${missingFiles.length} files.`);
    if (missingFiles.length > 0) {
        console.log(missingFiles);
    }
}

main();
