
import React from 'react';
import { Link } from 'react-router-dom';
import DailyQuote from '../components/DailyQuote';

const Home = () => {
    return (
        <section className="relative mt-14 h-[calc(100vh-3.5rem)] w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 red-curtain-full"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/25 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Particles */}
            <div className="lodge-particles pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="lodge-particle"></div>
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full gap-8 lg:gap-10">

                {/* Title & Quote Section */}
                <div className="text-center max-w-4xl mx-auto">
                    <p className="font-body text-xs md:text-sm tracking-[0.4em] text-white/40 uppercase mb-6 animate-fade-in">The World of</p>
                    <h1 className="hero-title font-hero text-6xl md:text-8xl lg:text-9xl text-white leading-[0.85] tracking-wide mb-8 drop-shadow-2xl animate-fade-in-up">
                        DAVID LYNCH
                        <span className="block text-2xl md:text-4xl lg:text-5xl text-white/50 tracking-[0.3em] mt-4 font-normal">
                            & TWIN PEAKS ARCHIVE
                        </span>
                    </h1>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <DailyQuote />
                    </div>
                </div>

                {/* Navigation Doors/Cards - Typographic Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

                    {/* The Return */}
                    <Link to="/episodes" className="group relative h-32 md:h-48 flex flex-col items-center justify-center border border-white/10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(196,30,58,0.3)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 text-center p-4">
                            <h3 className="font-gothic text-xl md:text-2xl font-semibold text-white/80 mb-2 tracking-wider group-hover:text-primary transition-colors duration-300">The Return</h3>
                            <div className="h-px w-8 bg-white/20 mx-auto mb-2 group-hover:w-16 group-hover:bg-primary/50 transition-all duration-500"></div>
                            <p className="font-body text-[10px] tracking-wide text-white/30 group-hover:text-white/50 transition-colors duration-300">エピソード解説</p>
                        </div>
                    </Link>

                    {/* Library */}
                    <Link to="/library" className="group relative h-32 md:h-48 flex flex-col items-center justify-center border border-white/10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(196,30,58,0.3)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 text-center p-4">
                            <h3 className="font-gothic text-xl md:text-2xl font-semibold text-white/80 mb-2 tracking-wider group-hover:text-primary transition-colors duration-300">資料室</h3>
                            <div className="h-px w-8 bg-white/20 mx-auto mb-2 group-hover:w-16 group-hover:bg-primary/50 transition-all duration-500"></div>
                            <p className="font-body text-[10px] tracking-wide text-white/30 group-hover:text-white/50 transition-colors duration-300">入門・リンチ・考察</p>
                        </div>
                    </Link>

                    {/* Black Lodge */}
                    <Link to="/black-lodge" className="group relative h-32 md:h-48 flex flex-col items-center justify-center border border-white/10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(196,30,58,0.3)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 text-center p-4">
                            <h3 className="font-gothic text-xl md:text-2xl font-semibold text-white/80 mb-2 tracking-wider group-hover:text-primary transition-colors duration-300">ブラックロッジ</h3>
                            <div className="h-px w-8 bg-white/20 mx-auto mb-2 group-hover:w-16 group-hover:bg-primary/50 transition-all duration-500"></div>
                            <p className="font-body text-[11px] tracking-wide text-white/40 group-hover:text-white/70 transition-colors duration-300">ロケ地・グルメ</p>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default Home;
