// Data loader that combines legacy data with CMS content
import { database as legacyDatabase } from './data.js';

// Load all JSON files from content directories using Vite's glob import
const studiesFiles = import.meta.glob('../content/studies/*.json', { eager: true, import: 'default' });
const guideFiles = import.meta.glob('../content/guide/*.json', { eager: true, import: 'default' });
const essaysFiles = import.meta.glob('../content/essays/*.json', { eager: true, import: 'default' });
const lynchFiles = import.meta.glob('../content/lynch/*.json', { eager: true, import: 'default' });
const travelFiles = import.meta.glob('../content/travel/*.json', { eager: true, import: 'default' });
const gourmetFiles = import.meta.glob('../content/gourmet/*.json', { eager: true, import: 'default' });
const blurayFiles = import.meta.glob('../content/bluray/*.json', { eager: true, import: 'default' });

// Convert glob imports to arrays
const extractItems = (files) => Object.values(files);

// Merge legacy data with CMS content
export const database = {
    studies: [...(legacyDatabase.studies || []), ...extractItems(studiesFiles)],
    guide: [...(legacyDatabase.guide || []), ...extractItems(guideFiles)],
    essays: [...(legacyDatabase.essays || []), ...extractItems(essaysFiles)],
    lynch: [...(legacyDatabase.lynch || []), ...extractItems(lynchFiles)],
    travel: [...(legacyDatabase.travel || []), ...extractItems(travelFiles)],
    gourmet: [...(legacyDatabase.gourmet || []), ...extractItems(gourmetFiles)],
    bluray: [...(legacyDatabase.bluray || []), ...extractItems(blurayFiles)],
};
