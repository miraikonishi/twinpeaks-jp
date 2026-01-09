// Migration script: Convert data.js to individual JSON files
import { database } from '../src/data.js';
import fs from 'fs';
import path from 'path';

const categories = ['studies', 'guide', 'essays', 'lynch', 'travel', 'gourmet', 'bluray'];

const contentDir = path.join(process.cwd(), 'content');

// Ensure directories exist
categories.forEach(cat => {
    const dir = path.join(contentDir, cat);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Migrate each category
let totalCount = 0;

categories.forEach(category => {
    const items = database[category] || [];
    console.log(`\n📁 ${category}: ${items.length} articles`);

    items.forEach(item => {
        const filename = `${item.id}.json`;
        const filepath = path.join(contentDir, category, filename);

        // Create JSON content
        const jsonContent = JSON.stringify(item, null, 2);

        // Write file
        fs.writeFileSync(filepath, jsonContent, 'utf8');
        console.log(`  ✅ ${filename}`);
        totalCount++;
    });
});

console.log(`\n✨ Migration complete! ${totalCount} articles converted.`);
console.log('\nNext steps:');
console.log('1. Remove old data from src/data.js');
console.log('2. Update src/dataLoader.js to only load from content/');
