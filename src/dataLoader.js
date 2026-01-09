// Data loader - loads all content from JSON files
// Managed by Sveltia CMS

const studiesFiles = import.meta.glob('../content/studies/*.json', { eager: true, import: 'default' });
const guideFiles = import.meta.glob('../content/guide/*.json', { eager: true, import: 'default' });
const essaysFiles = import.meta.glob('../content/essays/*.json', { eager: true, import: 'default' });
const lynchFiles = import.meta.glob('../content/lynch/*.json', { eager: true, import: 'default' });
const travelFiles = import.meta.glob('../content/travel/*.json', { eager: true, import: 'default' });
const gourmetFiles = import.meta.glob('../content/gourmet/*.json', { eager: true, import: 'default' });
const blurayFiles = import.meta.glob('../content/bluray/*.json', { eager: true, import: 'default' });

// Convert glob imports to arrays
const extractItems = (files) => Object.values(files);

export const database = {
    studies: extractItems(studiesFiles),
    guide: extractItems(guideFiles),
    essays: extractItems(essaysFiles),
    lynch: extractItems(lynchFiles),
    travel: extractItems(travelFiles),
    gourmet: extractItems(gourmetFiles),
    bluray: extractItems(blurayFiles),
};
