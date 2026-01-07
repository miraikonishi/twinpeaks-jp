
import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('src/data.js');
const updatesPath = path.resolve('content_image_updates.json');

if (!fs.existsSync(updatesPath)) {
    console.error('No updates file found.');
    process.exit(1);
}

const updates = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
let content = fs.readFileSync(dataPath, 'utf8');

let count = 0;
for (const update of updates) {
    // Try with double quotes
    const searchDouble = `image: "${update.oldImage}"`;
    const replaceDouble = `image: "${update.newImage}"`;

    // Try with single quotes
    const searchSingle = `image: '${update.oldImage}'`;
    const replaceSingle = `image: '${update.newImage}'`;

    if (content.includes(searchDouble)) {
        content = content.replace(searchDouble, replaceDouble);
        count++;
    } else if (content.includes(searchSingle)) {
        content = content.replace(searchSingle, replaceSingle);
        count++;
    } else {
        // Maybe whitespace differences? Try regex
        const regex = new RegExp(`image:\\s*["']${update.oldImage.replace(/\//g, '\\/')}["']`);
        if (regex.test(content)) {
            content = content.replace(regex, `image: "${update.newImage}"`);
            count++;
        } else {
            console.warn(`Could not find old image entry for ${update.id}: ${update.oldImage}`);
        }
    }
}

fs.writeFileSync(dataPath, content);
console.log(`Applied ${count} updates to src/data.js`);
