import './style.css';
import { database, categories as oldCategories } from './data.js';

// 新しいカテゴリ構造
const categories = {
  intro: 'はじめての方へ',
  filmography: 'Filmography',
  twinpeaks: 'Twin Peaks',
  deepdive: 'Deep Dive',
  // 旧カテゴリもマッピング維持（記事詳細用）
  guide: '入門ガイド',
  lynch: 'David Lynch',
  studies: 'Episode Guide',
  essays: '考察',
  gourmet: 'Gourmet',
  travel: 'Travel'
};

// 新カテゴリ → 旧カテゴリのマッピング
const categoryMapping = {
  intro: ['guide', 'lynch'],
  filmography: ['lynch'],
  twinpeaks: ['studies', 'guide'],
  deepdive: ['essays', 'gourmet', 'travel']
};

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('.nav-link');

  // Helper: Flatten all articles
  function getAllArticles() {
    return Object.keys(database).flatMap(key =>
      database[key].map(item => ({ ...item, category: key }))
    );
  }

  // Navigation Logic - Use event delegation for all nav links (header + footer)
  document.addEventListener('click', (e) => {
    const navLink = e.target.closest('.nav-link');
    if (navLink) {
      e.preventDefault();
      const category = navLink.getAttribute('data-category');
      if (category) {
        renderContent(category);
        window.scrollTo(0, 0);
      }
    }
  });

  function renderContent(category) {
    if (category === 'all' || !category) {
      renderHomepage();
    } else if (categoryMapping[category]) {
      // 新カテゴリの場合、複数の旧カテゴリをまとめて表示
      renderNewCategory(category);
    } else {
      // 旧カテゴリの場合（後方互換性）
      renderCategory(category);
    }
  }

  // 新カテゴリページのレンダリング
  function renderNewCategory(categoryKey) {
    const categoryName = categories[categoryKey];
    const oldCategoryKeys = categoryMapping[categoryKey] || [];

    // 複数の旧カテゴリからアイテムを集める
    let allItems = [];
    oldCategoryKeys.forEach(oldKey => {
      const items = database[oldKey] || [];
      items.forEach(item => {
        allItems.push({ ...item, originalCategory: oldKey });
      });
    });

    // studiesの場合はソート
    if (categoryKey === 'twinpeaks') {
      allItems = allItems.sort((a, b) => {
        if (a.originalCategory === 'studies' && b.originalCategory === 'studies') {
          const numA = parseInt(a.id.replace('ep', ''));
          const numB = parseInt(b.id.replace('ep', ''));
          return numA - numB;
        }
        // guideを先に
        if (a.originalCategory === 'guide') return -1;
        if (b.originalCategory === 'guide') return 1;
        return 0;
      });
    }

    const descriptions = {
      intro: 'David Lynchの世界へようこそ。ここから始めましょう。',
      filmography: 'David Lynchの映画作品とキャリア',
      twinpeaks: 'Twin Peaksシリーズの全て',
      deepdive: '考察、聖地巡礼、グルメなど'
    };

    mainContent.innerHTML = `
      <section class="mt-14 py-16 px-6">
        <div class="max-w-6xl mx-auto">
          <!-- Back button -->
          <button class="mb-8 font-mono text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2 btn-home">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>HOME</span>
          </button>

          <!-- Header -->
          <div class="flex items-start gap-6 mb-12">
            <div class="flex-shrink-0 w-12 h-12 rounded border border-primary/30 bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">folder_open</span>
            </div>
            <div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-2">${categoryName}</h2>
              <p class="font-body text-white/50 text-sm mb-1">${descriptions[categoryKey] || ''}</p>
              <p class="font-mono text-xs text-white/40 uppercase tracking-wider">${allItems.length} FILES</p>
            </div>
          </div>

          <!-- Items Grid -->
          ${categoryKey === 'twinpeaks' ? `
            <div class="space-y-12">
              ${allItems.filter(i => i.originalCategory === 'guide').length > 0 ? `
                <div>
                  <h3 class="font-mono text-xs text-primary uppercase tracking-widest mb-6">Twin Peaks 入門</h3>
                  <div class="grid md:grid-cols-2 gap-6">
                    ${allItems.filter(i => i.originalCategory === 'guide').map((item, index) => createDossierCard(item, item.originalCategory, index)).join('')}
                  </div>
                </div>
              ` : ''}
              ${allItems.filter(i => i.originalCategory === 'studies').length > 0 ? `
                <div>
                  <h3 class="font-mono text-xs text-primary uppercase tracking-widest mb-6">The Return Episode Guide</h3>
                  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    ${allItems.filter(i => i.originalCategory === 'studies').map((item, index) => createEpisodeCard(item, index)).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          ` : `
            <div class="grid md:grid-cols-2 gap-6">
              ${allItems.map((item, index) => createDossierCard(item, item.originalCategory, index)).join('')}
            </div>
          `}
        </div>
      </section>
    `;

    attachEventHandlers();
  }

  function renderHomepage() {
    // Sort episodes by part number for proper ordering
    const episodes = [...database.studies].sort((a, b) => {
      const numA = parseInt(a.id.replace('ep', ''));
      const numB = parseInt(b.id.replace('ep', ''));
      return numA - numB;
    }).slice(0, 8); // ホームでは8話分だけ表示

    mainContent.innerHTML = `
      <!-- Hero Section: The Black Lodge Archive -->
      <section class="relative mt-14 min-h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <!-- Background layers - Full curtain coverage -->
        <div class="absolute inset-0 red-curtain-full"></div>

        <!-- Red Lodge glow from bottom -->
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/25 blur-[150px] rounded-full"></div>

        <!-- Floating particles (subtle) -->
        <div class="lodge-particles">
          <div class="lodge-particle"></div>
          <div class="lodge-particle"></div>
          <div class="lodge-particle"></div>
          <div class="lodge-particle"></div>
          <div class="lodge-particle"></div>
          <div class="lodge-particle"></div>
          <div class="lodge-particle"></div>
          <div class="lodge-particle"></div>
        </div>

        <div class="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <!-- Welcome text - elegant, understated -->
          <p class="font-body text-sm md:text-base lg:text-lg tracking-[0.4em] text-white/40 uppercase mb-8">The World of</p>

          <!-- Main title - Bebas Neue with double vision effect -->
          <h1 class="hero-title font-hero text-7xl md:text-[9rem] lg:text-[12rem] text-white leading-[0.85] tracking-wide mb-4">
            DAVID LYNCH
          </h1>
          <p class="font-hero text-3xl md:text-4xl lg:text-5xl text-white/50 tracking-[0.3em] mb-16">
            & TWIN PEAKS
          </p>

          <!-- CTA Button -->
          <div class="flex justify-center gap-4">
            <button class="group px-8 py-4 bg-primary text-white font-mono text-sm uppercase tracking-widest rounded hover:bg-white hover:text-background-dark transition-all inline-flex items-center gap-3 shadow-lg shadow-primary/20" id="start-here-btn">
              <span>はじめての方へ</span>
              <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span class="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
          <div class="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
      </section>

      <!-- Section 01: はじめての方へ -->
      <section class="py-24 px-6 border-t border-white/5 relative overflow-hidden" id="start-section">
        <div class="absolute -left-8 top-12 font-hero text-[20rem] leading-none text-white/[0.02] pointer-events-none select-none">01</div>

        <div class="max-w-6xl mx-auto relative">
          <div class="mb-16">
            <span class="font-mono text-xs tracking-widest text-primary mb-4 block">CHAPTER 01</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">はじめての方へ</h2>
            <p class="font-body text-white/40 text-lg">David Lynchの世界へようこそ</p>
          </div>

          <!-- Intro Cards: guide + lynch combined -->
          <div class="grid md:grid-cols-2 gap-8">
            ${database.guide.slice(0, 2).map((item, index) => createBeginnerCard(item, 'guide', index)).join('')}
            ${database.lynch.slice(0, 2).map((item, index) => createBeginnerCard(item, 'lynch', index + 2)).join('')}
          </div>

          <div class="mt-10 text-center">
            <button class="nav-link font-mono text-sm text-white/40 hover:text-primary transition-colors" data-category="intro">
              もっと見る →
            </button>
          </div>
        </div>
      </section>

      <!-- Section 02: Filmography -->
      <section class="py-24 px-6 bg-surface-darker border-t border-white/5 relative overflow-hidden">
        <div class="absolute -right-8 top-12 font-hero text-[20rem] leading-none text-white/[0.02] pointer-events-none select-none">02</div>

        <div class="max-w-6xl mx-auto relative">
          <div class="mb-16">
            <span class="font-mono text-xs tracking-widest text-primary mb-4 block">CHAPTER 02</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">Filmography</h2>
            <p class="font-body text-white/40 text-lg">David Lynchの映画作品</p>
          </div>

          <!-- Lynch Filmography Cards -->
          <div class="grid md:grid-cols-2 gap-8">
            ${database.lynch.map((item, index) => createProfileCard(item, 'lynch', index)).join('')}
          </div>

          <div class="mt-10 text-center">
            <button class="nav-link font-mono text-sm text-white/40 hover:text-primary transition-colors" data-category="filmography">
              全作品を見る →
            </button>
          </div>
        </div>
      </section>

      <!-- Section 03: Twin Peaks -->
      <section class="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div class="absolute -left-8 top-12 font-hero text-[20rem] leading-none text-white/[0.02] pointer-events-none select-none">03</div>

        <div class="max-w-6xl mx-auto relative">
          <div class="mb-16">
            <span class="font-mono text-xs tracking-widest text-primary mb-4 block">CHAPTER 03</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">Twin Peaks</h2>
            <p class="font-body text-white/40 text-lg">伝説のTVシリーズを深掘り</p>
          </div>

          <!-- Episodes Grid (preview) -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            ${episodes.map((ep, index) => createEpisodeCard(ep, index)).join('')}
          </div>

          <div class="mt-10 text-center">
            <button class="nav-link font-mono text-sm text-white/40 hover:text-primary transition-colors" data-category="twinpeaks">
              Twin Peaks セクションへ →
            </button>
          </div>
        </div>
      </section>

      <!-- Section 04: Deep Dive -->
      <section class="py-24 px-6 bg-surface-darker border-t border-white/5 relative overflow-hidden">
        <div class="absolute -right-8 top-12 font-hero text-[20rem] leading-none text-white/[0.02] pointer-events-none select-none">04</div>

        <div class="max-w-6xl mx-auto relative">
          <div class="mb-16">
            <span class="font-mono text-xs tracking-widest text-primary mb-4 block">CHAPTER 04</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">Deep Dive</h2>
            <p class="font-body text-white/40 text-lg">考察、聖地巡礼、グルメなど</p>
          </div>

          <!-- Deep Dive Cards: essays + gourmet + travel -->
          <div class="grid md:grid-cols-3 gap-6">
            ${database.essays.slice(0, 3).map((item, index) => createEssayCard(item, 'essays', index)).join('')}
          </div>

          <div class="mt-8 grid md:grid-cols-2 gap-8">
            ${database.gourmet.slice(0, 1).map((item, index) => createExtraCard(item, 'gourmet', index)).join('')}
            ${database.travel.slice(0, 1).map((item, index) => createExtraCard(item, 'travel', index)).join('')}
          </div>

          <div class="mt-10 text-center">
            <button class="nav-link font-mono text-sm text-white/40 hover:text-primary transition-colors" data-category="deepdive">
              Deep Diveセクションへ →
            </button>
          </div>
        </div>
      </section>
    `;

    // Event handlers
    document.getElementById('start-here-btn')?.addEventListener('click', () => {
      document.getElementById('start-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    attachEventHandlers();
  }

  // Beginner Card - Large image, welcoming style
  function createBeginnerCard(article, categoryKey, index) {
    return `
      <article class="group relative rounded-xl overflow-hidden cursor-pointer read-more bg-surface-dark border border-white/5 hover:border-primary/30 transition-all" data-id="${article.id}" data-category="${categoryKey}">
        <!-- Large image -->
        <div class="aspect-[16/9] w-full overflow-hidden">
          <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500">
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="flex items-center gap-3 mb-3">
            <span class="font-mono text-[10px] tracking-widest text-primary uppercase">Guide ${String(index + 1).padStart(2, '0')}</span>
          </div>

          <h3 class="font-display text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
            ${article.title}
          </h3>

          <p class="font-body text-sm text-white/50 line-clamp-2 leading-relaxed">
            ${article.excerpt}
          </p>

          <div class="mt-4 flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-primary transition-colors">
            <span>Read more</span>
            <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>
      </article>
    `;
  }

  // Episode Card - Bold number, cinematic style
  function createEpisodeCard(episode, index) {
    const partNum = episode.id.replace('ep', '');
    return `
      <article class="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer read-more" data-id="${episode.id}" data-category="studies">
        <!-- Background image -->
        <div class="absolute inset-0">
          <img src="${episode.image}" alt="${episode.title}" class="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        </div>

        <!-- Large number watermark -->
        <div class="absolute top-3 right-3 font-hero text-6xl text-white/10 leading-none">
          ${String(partNum).padStart(2, '0')}
        </div>

        <!-- Content -->
        <div class="absolute inset-0 p-4 flex flex-col justify-end">
          <span class="font-mono text-[10px] tracking-widest text-primary mb-1">PART</span>
          <h3 class="font-hero text-3xl text-white group-hover:text-primary transition-colors">
            ${String(partNum).padStart(2, '0')}
          </h3>
        </div>

        <!-- Hover border -->
        <div class="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-lg transition-colors"></div>
      </article>
    `;
  }

  // Profile Card - For Lynch section, portrait style
  function createProfileCard(article, categoryKey, index) {
    return `
      <article class="group relative rounded-xl overflow-hidden cursor-pointer read-more bg-surface-dark" data-id="${article.id}" data-category="${categoryKey}">
        <div class="flex flex-col md:flex-row">
          <!-- Portrait image -->
          <div class="md:w-1/3 aspect-[3/4] md:aspect-auto overflow-hidden">
            <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500">
          </div>

          <!-- Content -->
          <div class="flex-1 p-6 flex flex-col justify-center">
            <span class="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-3">Profile</span>

            <h3 class="font-display text-2xl font-bold text-white group-hover:text-primary transition-colors mb-3">
              ${article.title}
            </h3>

            <p class="font-body text-sm text-white/50 line-clamp-3 leading-relaxed mb-4">
              ${article.excerpt}
            </p>

            <div class="flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-primary transition-colors">
              <span>View profile</span>
              <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // Essay Card - Text focused, editorial style
  function createEssayCard(article, categoryKey, index) {
    return `
      <article class="group p-6 rounded-xl border border-white/5 bg-surface-dark hover:border-primary/20 hover:bg-surface-darker transition-all cursor-pointer read-more" data-id="${article.id}" data-category="${categoryKey}">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-primary text-[20px]">psychology</span>
        </div>

        <h3 class="font-display text-lg font-bold text-white group-hover:text-primary transition-colors mb-3 line-clamp-2">
          ${article.title}
        </h3>

        <p class="font-body text-sm text-white/40 line-clamp-3 leading-relaxed mb-4">
          ${article.excerpt}
        </p>

        <div class="flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-primary transition-colors">
          <span>Read essay</span>
          <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </article>
    `;
  }

  // Extra Card - For Gourmet/Travel, horizontal style
  function createExtraCard(article, categoryKey, index) {
    const icons = {
      gourmet: 'restaurant',
      travel: 'travel_explore'
    };
    const labels = {
      gourmet: 'Gourmet',
      travel: 'Travel'
    };

    return `
      <article class="group relative rounded-xl overflow-hidden cursor-pointer read-more bg-surface-dark border border-white/5 hover:border-white/10 transition-all" data-id="${article.id}" data-category="${categoryKey}">
        <div class="flex">
          <!-- Image -->
          <div class="w-1/3 aspect-square overflow-hidden">
            <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500">
          </div>

          <!-- Content -->
          <div class="flex-1 p-5 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-white/30 text-[16px]">${icons[categoryKey]}</span>
              <span class="font-mono text-[10px] tracking-widest text-white/30 uppercase">${labels[categoryKey]}</span>
            </div>

            <h3 class="font-display text-lg font-bold text-white group-hover:text-white transition-colors mb-2">
              ${article.title}
            </h3>

            <p class="font-body text-sm text-white/40 line-clamp-2 leading-relaxed">
              ${article.excerpt}
            </p>
          </div>
        </div>
      </article>
    `;
  }

  // Dossier Card - Generic card for category pages and search results
  function createDossierCard(article, categoryKey, index) {
    const categoryLabels = {
      guide: 'Guide',
      studies: 'Episode',
      lynch: 'Profile',
      essays: 'Essay',
      gourmet: 'Gourmet',
      travel: 'Travel'
    };

    return `
      <article class="group relative rounded-xl overflow-hidden cursor-pointer read-more bg-surface-dark border border-white/5 hover:border-primary/30 transition-all" data-id="${article.id}" data-category="${categoryKey}">
        <div class="flex">
          <!-- Image -->
          <div class="w-1/3 aspect-[4/3] overflow-hidden">
            <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500">
          </div>

          <!-- Content -->
          <div class="flex-1 p-5 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-mono text-[10px] tracking-widest text-primary uppercase">${categoryLabels[categoryKey] || categoryKey}</span>
            </div>

            <h3 class="font-display text-lg font-bold text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
              ${article.title}
            </h3>

            <p class="font-body text-sm text-white/40 line-clamp-2 leading-relaxed">
              ${article.excerpt}
            </p>

            <div class="mt-3 flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-primary transition-colors">
              <span>Read more</span>
              <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderCategory(categoryKey) {
    const categoryName = categories[categoryKey] || categoryKey;
    const items = database[categoryKey] || [];

    // Sort episodes if studies
    const sortedItems = categoryKey === 'studies'
      ? [...items].sort((a, b) => {
          const numA = parseInt(a.id.replace('ep', ''));
          const numB = parseInt(b.id.replace('ep', ''));
          return numA - numB;
        })
      : items;

    mainContent.innerHTML = `
      <section class="mt-14 py-16 px-6">
        <div class="max-w-6xl mx-auto">
          <!-- Back button -->
          <button class="mb-8 font-mono text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2 btn-home">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>HOME</span>
          </button>

          <!-- Header -->
          <div class="flex items-start gap-6 mb-12">
            <div class="flex-shrink-0 w-12 h-12 rounded border border-primary/30 bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">folder_open</span>
            </div>
            <div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-2">${categoryName}</h2>
              <p class="font-mono text-xs text-white/40 uppercase tracking-wider">${sortedItems.length} FILES</p>
            </div>
          </div>

          <!-- Items Grid -->
          ${categoryKey === 'studies' ? `
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              ${sortedItems.map((item, index) => createEpisodeCard(item, index)).join('')}
            </div>
          ` : `
            <div class="grid md:grid-cols-2 gap-6">
              ${sortedItems.map((item, index) => createDossierCard(item, categoryKey, index)).join('')}
            </div>
          `}
        </div>
      </section>
    `;

    attachEventHandlers();
  }

  function renderArticle(id, categoryKey) {
    const items = database[categoryKey] || [];
    const article = items.find(i => i.id === id);
    if (!article) return;

    // Format content
    const formattedContent = article.content
      .replace(/### (.*)/g, '<h3 class="font-display text-2xl font-bold text-white mt-10 mb-4">$1</h3>')
      .replace(/#### (.*)/g, '<h4 class="font-display text-xl font-semibold text-white mt-8 mb-3">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/> (.*)/g, '<blockquote class="border-l-2 border-primary pl-4 italic text-white/70 my-6">$1</blockquote>')
      .replace(/- (.*)/g, '<li class="ml-4 text-white/70">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br/>');

    mainContent.innerHTML = `
      <article class="mt-14 py-16 px-6">
        <div class="max-w-3xl mx-auto">
          <!-- Back button -->
          <button class="mb-8 font-mono text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2 btn-back" data-category="${categoryKey}">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>BACK TO ${categories[categoryKey]?.toUpperCase() || 'LIST'}</span>
          </button>

          <!-- Article Header -->
          <header class="mb-10">
            <!-- File metadata -->
            <div class="flex items-center gap-3 mb-6">
              <div class="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 rounded bg-primary/5">
                <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span class="font-mono text-[10px] uppercase tracking-widest text-primary">
                  ${categories[categoryKey]}
                </span>
              </div>
              <span class="font-mono text-[10px] text-white/30 uppercase">ID: ${article.id}</span>
            </div>

            <h1 class="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              ${article.title}
            </h1>

            ${article.originalTitle ? `
              <p class="font-body text-lg text-white/50 mb-6">${article.originalTitle}</p>
            ` : ''}

            <div class="p-4 border-l-2 border-white/20 bg-surface-dark rounded-r">
              <p class="font-body text-white/70 leading-relaxed">
                ${article.excerpt}
              </p>
            </div>
          </header>

          ${article.image ? `
            <div class="mb-12 rounded-lg overflow-hidden border border-white/10">
              <img src="${article.image}" class="w-full" alt="${article.title}">
            </div>
          ` : ''}

          <!-- Article Content -->
          <div class="prose-custom font-body text-white/80 leading-8">
            <p class="mb-4">${formattedContent}</p>
          </div>

          <!-- Navigation -->
          <div class="mt-16 pt-8 border-t border-white/10">
            <button class="font-mono text-sm text-white/50 hover:text-primary transition-colors flex items-center gap-2 btn-back" data-category="${categoryKey}">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to ${categories[categoryKey]}</span>
            </button>
          </div>
        </div>
      </article>
    `;

    attachEventHandlers();
  }

  function attachEventHandlers() {
    document.querySelectorAll('.read-more').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const target = e.target.closest('.read-more');
        if (target) {
          const id = target.getAttribute('data-id');
          const cat = target.getAttribute('data-category');
          renderArticle(id, cat);
          window.scrollTo(0, 0);
        }
      });
    });

    document.querySelectorAll('.btn-back').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const target = e.target.closest('.btn-back');
        if (target) {
          const cat = target.getAttribute('data-category');
          renderContent(cat);
          window.scrollTo(0, 0);
        }
      });
    });

    document.querySelectorAll('.btn-home').forEach(elem => {
      elem.addEventListener('click', () => {
        renderHomepage();
        window.scrollTo(0, 0);
      });
    });
  }

  // Search Logic
  const searchToggle = document.getElementById('search-toggle');
  const searchContainer = document.getElementById('search-container');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');

  if (searchToggle && searchContainer && searchClose && searchInput) {
    searchToggle.addEventListener('click', () => {
      searchContainer.classList.add('open');
      searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
      searchContainer.classList.remove('open');
      searchInput.value = '';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchContainer.classList.contains('open')) {
        searchContainer.classList.remove('open');
      }
    });

    let debounceTimeout;
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();

      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        if (query.length > 1) {
          performSearch(query);
        }
      }, 300);
    });
  }

  function performSearch(query) {
    const allItems = getAllArticles();
    const results = allItems.filter(item => {
      const titleMatch = item.title?.toLowerCase().includes(query);
      const excerptMatch = item.excerpt?.toLowerCase().includes(query);
      const contentMatch = item.content?.toLowerCase().includes(query);
      const originalTitleMatch = item.originalTitle?.toLowerCase().includes(query);

      return titleMatch || excerptMatch || contentMatch || originalTitleMatch;
    });

    renderSearchResults(results, query);
  }

  function renderSearchResults(results, query) {
    searchContainer.classList.remove('open');

    mainContent.innerHTML = `
      <section class="mt-14 py-16 px-6">
        <div class="max-w-6xl mx-auto">
          <!-- Back button -->
          <button class="mb-8 font-mono text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2 btn-home">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>HOME</span>
          </button>

          <!-- Header -->
          <div class="flex items-start gap-6 mb-12">
            <div class="flex-shrink-0 w-12 h-12 rounded border border-primary/30 bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">search</span>
            </div>
            <div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-2">Search Results</h2>
              <p class="font-mono text-xs text-white/40 uppercase tracking-wider">
                QUERY: "${query}" / ${results.length} FILES FOUND
              </p>
            </div>
          </div>

          ${results.length === 0 ? `
            <div class="text-center py-20">
              <p class="font-mono text-white/40 uppercase tracking-wider">No archives found matching your query.</p>
            </div>
          ` : `
            <div class="grid md:grid-cols-2 gap-6">
              ${results.map((item, index) => createDossierCard(item, item.category, index)).join('')}
            </div>
          `}
        </div>
      </section>
    `;

    attachEventHandlers();
  }

  // Initial Render
  renderHomepage();
});
