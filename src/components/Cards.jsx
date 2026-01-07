import React from 'react';
import { Link } from 'react-router-dom';

// Beginner Card - Large image, welcoming style
export const BeginnerCard = ({ item, index, category = 'Guide' }) => {
    return (
        <Link to={`/article/${item.id}`} className="block h-full">
            <article className="group relative rounded-xl overflow-hidden cursor-pointer bg-surface-dark border border-white/5 hover:border-primary/30 transition-all h-full">
                <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
                            {category} {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                        {item.title}
                    </h3>
                    <p className="font-body text-sm text-white/50 line-clamp-2 leading-relaxed">
                        {item.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-primary transition-colors">
                        <span>Read more</span>
                        <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

// Episode Card - Bold number, cinematic style with title overlay on hover
export const EpisodeCard = ({ item }) => {
    const partNum = item.id.replace('ep', '');
    return (
        <Link to={`/article/${item.id}`} className="block">
            <article className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer">
                <div className="absolute inset-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                </div>
                <div className="absolute top-3 right-3 font-hero text-6xl text-white/10 leading-none">
                    {String(partNum).padStart(2, '0')}
                </div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <span className="font-mono text-[10px] tracking-widest text-primary mb-1">PART</span>
                    <h3 className="font-hero text-3xl text-white group-hover:text-primary transition-colors">
                        {String(partNum).padStart(2, '0')}
                    </h3>
                    {/* Title overlay on hover */}
                    <p className="font-body text-xs text-white/0 group-hover:text-white/80 transition-all duration-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.title}
                    </p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(196,30,58,0.3)] rounded-lg transition-all duration-500"></div>
            </article>
        </Link>
    );
};

// Profile Card - For Lynch section, portrait logic
export const ProfileCard = ({ item }) => {
    return (
        <Link to={`/article/${item.id}`} className="block h-full">
            <article className="group relative rounded-xl overflow-hidden cursor-pointer bg-surface-dark h-full">
                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/3 aspect-[3/4] md:aspect-auto overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center">
                        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-3">Profile</span>
                        <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary transition-colors mb-3">
                            {item.title}
                        </h3>
                        <p className="font-body text-sm text-white/50 line-clamp-3 leading-relaxed mb-4">
                            {item.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-primary transition-colors">
                            <span>View profile</span>
                            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};

// Generic Dossier Card
export const DossierCard = ({ item, category }) => {
    return (
        <Link to={`/article/${item.id}`} className="block h-full">
            <article className="group relative rounded-xl overflow-hidden cursor-pointer bg-surface-dark border border-white/5 hover:border-primary/30 transition-all h-full">
                <div className="flex">
                    <div className="w-1/3 aspect-[4/3] overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-[10px] tracking-widest text-primary uppercase">{category}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
                            {item.title}
                        </h3>
                        <p className="font-body text-sm text-white/40 line-clamp-2 leading-relaxed">
                            {item.excerpt}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-primary transition-colors">
                            <span>Read more</span>
                            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};

// ZigZag Card - For Travel Section (Alternating layout)
export const ZigZagCard = ({ item, category, reversed }) => {
    return (
        <Link to={`/article/${item.id}`} className="block group mb-16 last:mb-0">
            <article className={`flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''} gap-8 items-center`}>
                <div className="w-full md:w-3/5 overflow-hidden rounded-lg">
                    <div className="aspect-[16/9] relative overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                </div>
                <div className="w-full md:w-2/5 flex flex-col justify-center">
                    <span className="font-mono text-[10px] tracking-widest text-primary uppercase mb-3 flex items-center gap-2">
                        <span className="w-8 h-px bg-primary"></span>
                        {category}
                    </span>
                    <h3 className="font-display text-3xl font-bold text-white group-hover:text-primary transition-colors mb-4">
                        {item.title}
                    </h3>
                    <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
                        {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/40 group-hover:text-white transition-colors uppercase tracking-wider">
                        <span>Explore Location</span>
                        <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

// Menu Card - For Gourmet Section (Diner Menu Style)
export const MenuCard = ({ item, category }) => {
    return (
        <Link to={`/article/${item.id}`} className="block h-full group">
            <article className="h-full bg-surface-darker border border-white/5 p-1 rounded hover:border-primary/30 transition-colors">
                <div className="h-full border border-white/5 p-5 flex gap-4 items-start relative overflow-hidden">
                    {/* Decorative dots background */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

                    <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden mt-1">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all"
                        />
                    </div>
                    <div className="flex-1 relative z-10">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-display text-lg font-bold text-white group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            {/* Fake price for style */}
                            <span className="font-mono text-xs text-primary font-bold">$??.??</span>
                        </div>
                        <div className="w-full h-px bg-white/10 mb-2 border-b border-dashed border-white/20"></div>
                        <p className="font-body text-xs text-white/50 leading-relaxed line-clamp-3">
                            {item.excerpt}
                        </p>
                        <div className="mt-3 inline-block px-2 py-1 border border-white/10 rounded text-[10px] font-mono text-white/40 uppercase tracking-wider group-hover:border-primary/30 group-hover:text-primary transition-colors">
                            View Recipe
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};
