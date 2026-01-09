import React from 'react';
import { database } from '../dataLoader';
import { ZigZagCard, MenuCard, DossierCard } from '../components/Cards';
import { Link } from 'react-router-dom';

const BlackLodge = () => {
    return (
        <section className="mt-14 py-16 px-6 relative min-h-screen">
            {/* Subtle red curtain background - consistent with Episodes */}
            <div className="absolute inset-0 opacity-30 red-curtain-full pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <Link to="/" className="mb-8 font-body text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2">
                    <span>← ホームへ</span>
                </Link>

                <div className="mb-16">
                    <h1 className="font-gothic text-3xl md:text-4xl font-semibold text-white mb-2">ブラックロッジ</h1>
                    <p className="font-body text-white/50 text-sm mb-1">ツイン・ピークスの世界を巡るロケ地とグルメ</p>
                    <p className="font-mono text-xs text-white/40 tracking-wider">Black Lodge</p>
                </div>

                <div className="space-y-24">

                    {/* I. LOCATIONS (Travel) */}
                    <div id="travel">
                        <div className="mb-10">
                            <h2 className="font-gothic text-2xl font-semibold text-white mb-1">ロケ地</h2>
                            <p className="font-body text-xs text-white/40">ツイン・ピークスの舞台を巡る</p>
                        </div>

                        <div className="space-y-0">
                            {(database.travel || []).map((item, index) => (
                                <ZigZagCard
                                    key={item.id}
                                    item={item}
                                    reversed={index % 2 !== 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* II. CULTURE & ARCHIVES */}
                    <div id="culture-archives">
                        <div className="mb-10">
                            <h2 className="font-gothic text-2xl font-semibold text-white mb-1">カルチャー</h2>
                            <p className="font-body text-xs text-white/40">ツイン・ピークスの味と記録</p>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-12">

                            {/* Left Col: Gourmet */}
                            <div className="lg:col-span-5 flex flex-col gap-4">
                                <h3 className="font-body text-xs text-white/40 tracking-wide">グルメ</h3>
                                <div className="space-y-4">
                                    {(database.gourmet || []).map((item) => (
                                        <MenuCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </div>

                            {/* Right Col: Archives */}
                            <div className="lg:col-span-7 flex flex-col gap-4">
                                <h3 className="font-body text-xs text-white/40 tracking-wide">アーカイブ</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {(database.bluray || []).map((item) => (
                                        <DossierCard key={item.id} item={item} />
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
