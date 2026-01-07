import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '../src/data.js');

try {
    const content = fs.readFileSync(targetFile, 'utf8');
    const lines = content.split('\n');
    const newLines = [];
    let buffer = [];

    // Helper to process buffer
    const processBuffer = () => {
        if (buffer.length === 0) return;

        if (buffer.length === 1) {
            newLines.push(buffer[0].fullLine);
        } else {
            // Merge lines
            // Use indentation of the first line
            const firstLine = buffer[0];
            const intent = firstLine.indent;

            // Extract content from all lines
            const contents = buffer.map(item => item.content);
            const mergedContent = contents.join('<br>');
            const encodedContent = `${intent}> ${mergedContent}`;

            newLines.push(encodedContent);
            console.log(`Merged ${buffer.length} lines ending at line ${firstLine.index + 1}`);
        }
        buffer = [];
    };

    lines.forEach((line, index) => {
        // Match line starting with optional whitespace and '> '
        // We match exactly '> ' to be safe, assuming that's the format used.
        const match = line.match(/^(\s*)> (.*)/);

        if (match) {
            buffer.push({
                fullLine: line,
                indent: match[1],
                content: match[2],
                index: index
            });
        } else {
            // Not a quote line, process pending buffer if any
            processBuffer();
            newLines.push(line);
        }
    });

    // Process any remaining buffer at end of file
    processBuffer();

    const newContent = newLines.join('\n');

    // Only write if changed
    if (newContent !== content) {
        fs.writeFileSync(targetFile, newContent, 'utf8');
        console.log('Successfully updated src/data.js with consolidated blockquotes.');
    } else {
        console.log('No changes needed for src/data.js');
    }

} catch (err) {
    console.error('Error processing file:', err);
    process.exit(1);
}
