import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, '../src/data.js');

// Read existing data.js file
let content = fs.readFileSync(dataPath, 'utf8');

// We will use regex to find objects and swap title/originalTitle
// This is critical to do carefully to avoid breaking the file structure
// Strategy: Iterate over all objects that have both title and originalTitle keys

// Regex to capture an object's properties. This is a bit complex for regex...
// Let's try to match blocks like:
// id: "...",
// title: "...",
// originalTitle: "...",

// Actually, since the file is well-formatted, we can regex replace pairs.
// Look for title: "A", originalTitle: "B" sequence (or vice versa) and swap.
// Note: order might vary, but usually title comes before originalTitle in this file.

// Pattern: title: "...", [whitespace] originalTitle: "..."
// We need to capture the quotes content.

// Regex explain:
// title:\s*"([^"]+)" -> group 1 is title content
// \s*,\s* -> comma and whitespace
// originalTitle:\s*"([^"]+)" -> group 2 is originalTitle content

const pattern = /title:\s*"([^"]+)",\s*originalTitle:\s*"([^"]+)"/g;

let matchCount = 0;
const newContent = content.replace(pattern, (match, title, originalTitle) => {
    matchCount++;
    console.log(`Swapping: "${title}" <-> "${originalTitle}"`);
    return `title: "${originalTitle}",
            originalTitle: "${title}"`;
});

// Write result
fs.writeFileSync(dataPath, newContent, 'utf8');

console.log(`Swapped ${matchCount} title pairs.`);
