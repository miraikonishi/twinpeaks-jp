import React from 'react';
import { database } from '../dataLoader';
import { EpisodeCard } from '../components/Cards';
import { Link } from 'react-router-dom';

const Episodes = () => {
    const episodes = [...(database.studies || [])].sort((a, b) => {
        const numA = parseInt(a.id.replace('ep', ''));
        const numB = parseInt(b.id.replace('ep', ''));
        return numA - numB;
    });

    return (
        <section className="mt-14 py-16 px-6 relative min-h-screen">
            {/* Subtle red curtain background */}
            <div className="absolute inset-0 opacity-30 red-curtain-full pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <Link to="/" className="mb-8 font-body text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2">
                    <span>← ホームへ</span>
                </Link>

                <div className="mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">The Return</h2>
                    <p className="font-body text-white/50 text-sm mb-1">ツイン・ピークス The Return 詳細解説</p>
                    <p className="font-mono text-xs text-white/40 tracking-wider">全{episodes.length}話</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 scroll-reveal-stagger visible">
                    {episodes.map((item) => (
                        <EpisodeCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Episodes;
