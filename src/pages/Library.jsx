import React from 'react';
import { database } from '../data';
import { BeginnerCard, ProfileCard, DossierCard } from '../components/Cards';
import { Link } from 'react-router-dom';

const Library = () => {
    return (
        <section className="mt-14 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <Link to="/" className="mb-8 font-body text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2">
                    <span>← ホームへ</span>
                </Link>

                <div className="mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">資料室</h2>
                    <p className="font-body text-white/50 text-sm mb-1">入門ガイド、デヴィッド・リンチ、考察</p>
                    <p className="font-mono text-xs text-white/40 tracking-wider">Library</p>
                </div>

                <div className="space-y-16">
                    {/* Guide Section */}
                    <div id="guide">
                        <h3 className="font-body text-sm text-primary tracking-wide mb-6 border-b border-white/10 pb-2">入門ガイド</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {(database.guide || []).map((item, index) => (
                                <BeginnerCard key={item.id} item={item} index={index} category="Guide" />
                            ))}
                        </div>
                    </div>

                    {/* Lynch Section */}
                    <div id="lynch">
                        <h3 className="font-body text-sm text-primary tracking-wide mb-6 border-b border-white/10 pb-2">デヴィッド・リンチ</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {(database.lynch || []).map((item) => (
                                <ProfileCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* Essays Section */}
                    <div id="essays">
                        <h3 className="font-body text-sm text-primary tracking-wide mb-6 border-b border-white/10 pb-2">考察</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {(database.essays || []).map((item) => (
                                <DossierCard key={item.id} item={item} category="考察" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Library;
