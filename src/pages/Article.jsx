import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { Link } from 'react-router-dom';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find article in any category
  const findArticle = () => {
    for (const [key, items] of Object.entries(database)) {
      if (!Array.isArray(items)) continue;
      const found = items.find(item => item.id === id);
      if (found) return { ...found, category: key };
    }
    return null;
  };

  const article = findArticle();

  useEffect(() => {
    if (!article) {
      // Optional: Redirect to 404
    } else {
      document.title = `${article.title} | Twin Peaks Archive`;
    }
    window.scrollTo(0, 0);
  }, [id, article]);

  if (!article) return <div className="text-center text-white pt-20">Article not found</div>;

  // Simple formatter
  const formatContent = (text) => {
    if (!text) return '';
    return text
      .replace(/### (.*)/g, '<h3 class="font-display text-2xl font-bold text-white mt-10 mb-4">$1</h3>')
      .replace(/#### (.*)/g, '<h4 class="font-display text-xl font-semibold text-white mt-8 mb-3">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
      .replace(/- (.*)/g, '<div class="flex items-start gap-3 mb-2"><span class="text-primary font-bold text-lg leading-[1.6rem]">−</span><span class="text-white/70 leading-8">$1</span></div>')
      .replace(/\n\n/g, '<div class="h-4"></div>')
      .replace(/\n/g, '<br/>')
      .replace(/<\/div><br\/>/g, '</div>');
  };

  const categoryLabel = article.category.charAt(0).toUpperCase() + article.category.slice(1);

  // Back link logic
  let backLink = '/';
  if (article.category === 'studies') backLink = '/episodes';
  if (['guide', 'essays', 'lynch'].includes(article.category)) backLink = '/library';
  if (['travel', 'gourmet', 'bluray'].includes(article.category)) backLink = '/black-lodge';

  return (
    <article className="mt-14 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(backLink)}
          className="mb-8 font-body text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2"
        >
          <span>← 一覧へ戻る</span>
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 rounded bg-primary/5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {categoryLabel}
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/30 uppercase">ID: {article.id}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-accent-gold leading-tight mb-2">
            {article.title}
          </h1>

          {article.originalTitle && (
            <h2 className="font-display text-xl md:text-2xl text-white font-bold mb-8 tracking-wide">
              {article.originalTitle}
              {article.secondaryTitle && <span className="block mt-1 text-lg opacity-80">{article.secondaryTitle}</span>}
            </h2>
          )}

          {/* Excerpt hidden to avoid spoilers
          <div className="p-4 border-l-2 border-white/20 bg-surface-dark rounded-r">
            <p className="font-body text-white/70 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
          */}
        </header>

        {article.image && article.category !== 'studies' && (
          <div className="mb-12 rounded-lg overflow-hidden border border-white/10">
            <img src={article.image} className="w-full" alt={article.title} />
          </div>
        )}

        <div
          className="prose-custom font-body text-white/80 leading-8"
          dangerouslySetInnerHTML={{ __html: `<div class="mb-4">${formatContent(article.content)}</div>` }}
        />

        <div className="mt-12 mb-8 text-center">
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            Twin Peaks © Twin Peaks Productions, Inc. All rights reserved.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <Link to={backLink} className="font-body text-sm text-white/50 hover:text-primary transition-colors flex items-center gap-2">
            <span>← 一覧へ戻る</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Article;
