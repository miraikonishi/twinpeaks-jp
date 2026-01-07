import React from 'react';
import { database } from '../data';
import { ZigZagCard, MenuCard, DossierCard } from '../components/Cards';
import { Link } from 'react-router-dom';

const BlackLodge = () => {
    return (
        <section className="relative w-full min-h-screen">

            {/* --- Hero Section --- */}
            <div className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-primary/20">
                {/* Background: Abstract Red Room Feel */}
                <div className="absolute inset-0 bg-surface-darker"></div>
                <div className="absolute inset-0 opacity-20 red-curtain-full"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-darker via-transparent to-black/60"></div>

                {/* Chevron Floor Pattern Overlay - Black Lodge signature */}
                <div className="zigzag-floor opacity-20"></div>

                <div className="relative z-10 text-center px-6 mt-14">
                    <p className="font-body text-xs md:text-sm tracking-[0.3em] text-primary mb-4 animate-fade-in">ようこそ</p>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest mb-6 drop-shadow-2xl animate-fade-in-up">
                        ブラックロッジ
                    </h1>
                    <p className="font-mono text-xs text-white/40 tracking-wider mb-6">Black Lodge</p>
                    <div className="h-px w-24 bg-primary mx-auto mb-6"></div>
                    <p className="font-body text-white/60 text-sm md:text-base max-w-md mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        ツイン・ピークスの世界を巡るロケ地とグルメ<br />
                        <span className="italic text-white/30">"I'll see you in 25 years."</span>
                    </p>
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 font-body text-xs text-white/30 hover:text-white transition-colors tracking-wide">
                        ← ホームへ
                    </Link>
                </div>

                <div className="space-y-32">

                    {/* I. LOCATIONS (Travel) - ZigZag Layout */}
                    <div id="travel">
                        <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-12">
                            <div>
                                <h2 className="font-display text-4xl text-white mb-1">ロケ地</h2>
                                <p className="font-body text-xs text-primary tracking-wide">ツイン・ピークスの舞台を巡る</p>
                            </div>
                            <span className="font-mono text-[10px] text-white/30">01</span>
                        </div>

                        <div className="space-y-0">
                            {(database.travel || []).map((item, index) => (
                                <ZigZagCard
                                    key={item.id}
                                    item={item}
                                    category="Travel Log"
                                    reversed={index % 2 !== 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* II. CULTURE & ARCHIVES - 2 Column Layout */}
                    <div id="culture-archives">
                        <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-12">
                            <div>
                                <h2 className="font-display text-4xl text-white mb-1">カルチャー</h2>
                                <p className="font-body text-xs text-primary tracking-wide">ツイン・ピークスの味と記録</p>
                            </div>
                            <span className="font-mono text-[10px] text-white/30">02</span>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-12">

                            {/* Left Col: Gourmet (Menu) - Span 5 */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <h3 className="font-body text-xs text-white/40 tracking-wide mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary/50 rounded-full"></span>
                                    グルメ
                                </h3>
                                <div className="flex-1 bg-black/20 p-6 rounded-lg border border-white/5 h-full">
                                    <div className="space-y-6">
                                        {(database.gourmet || []).map((item) => (
                                            <MenuCard key={item.id} item={item} category="Recipe" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Archives (Grid) - Span 7 */}
                            <div className="lg:col-span-7 flex flex-col gap-6">
                                <h3 className="font-body text-xs text-white/40 tracking-wide mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white/20 rounded-full"></span>
                                    アーカイブ
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {(database.bluray || []).map((item) => (
                                        <DossierCard key={item.id} item={item} category="Review" />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlackLodge;
