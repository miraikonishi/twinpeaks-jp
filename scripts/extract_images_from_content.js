
import fs from 'fs';
import path from 'path';
import { database } from '../src/data.js';

async function main() {
    const publicDir = path.resolve('public');
    const allCategories = Object.keys(database);
    const updates = [];
    const missingImages = [];

    console.log(`Processing categories: ${allCategories.join(', ')}...`);

    for (const category of allCategories) {
        const items = database[category];
        if (!Array.isArray(items)) continue;

        for (const item of items) {
            if (!item.content) {
                continue;
            }

            // Extract first image from content
            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
                let imageUrl = imgMatch[1];

                // Check if exists locally
                const localPath = path.join(publicDir, imageUrl);

                if (fs.existsSync(localPath)) {
                    // Update image path
                    if (item.image !== imageUrl) {
                        updates.push({
                            id: item.id,
                            oldImage: item.image,
                            newImage: imageUrl
                        });
                        console.log(`[${category}:${item.id}] Using content image: ${imageUrl}`);
                    }
                } else {
                    console.warn(`[${category}:${item.id}] Content image missing locally: ${imageUrl}`);
                    missingImages.push(imageUrl);
                }
            }
        }
    }

    // Generate a JSON file with updates to be applied
    fs.writeFileSync('content_image_updates.json', JSON.stringify(updates, null, 2));
    console.log('--------------------------------------------------');
    console.log(`Found ${updates.length} updates. Written to content_image_updates.json`);
    if (missingImages.length > 0) {
        console.log(`Missing ${missingImages.length} images locally.`);
        fs.writeFileSync('missing_content_images.txt', missingImages.join('\n'));
    }
}

main();
