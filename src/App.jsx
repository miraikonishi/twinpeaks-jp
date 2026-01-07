import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Episodes from './pages/Episodes';
import Library from './pages/Library';
import BlackLodge from './pages/BlackLodge';
import Article from './pages/Article';

// ScrollToTop component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Page transition wrapper
const PageWrapper = ({ children }) => {
    const { pathname } = useLocation();
    return (
        <div key={pathname} className="page-enter">
            {children}
        </div>
    );
};

function App() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <Router>
            <ScrollToTop />
            <div className="bg-noise"></div>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-primary/20 bg-background-dark/95 backdrop-blur-md">
                    <div className="mx-auto flex h-14 items-center justify-between px-6 lg:px-8">
                        <Link to="/" className="flex items-center gap-4 group cursor-pointer">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest-plus text-primary">
                                    CASE FILE
                                </span>
                            </div>
                            <div className="h-4 w-px bg-white/20"></div>
                            <h1 className="font-mono text-xs font-medium uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">
                                Twin Peaks <span className="text-white/50">Archive</span>
                            </h1>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-1 main-nav">
                            <Link to="/episodes" className="nav-link font-body text-[12px] font-medium tracking-wider text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded transition-all">
                                エピソード
                            </Link>
                            <Link to="/library" className="nav-link font-body text-[12px] font-medium tracking-wider text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded transition-all">
                                資料室
                            </Link>
                            <Link to="/black-lodge" className="nav-link font-body text-[12px] font-medium tracking-wider text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded transition-all">
                                ブラックロッジ
                            </Link>
                        </nav>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded" aria-label="Search"
                            >
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </button>
                            <button
                                className="lg:hidden text-white/70 hover:text-white p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Search Overlay (Placeholder functionality) */}
                <div id="search-container" className={`fixed top-14 left-0 w-full bg-surface-darker/98 backdrop-blur-md border-b border-primary/20 p-6 transform transition-transform duration-300 z-30 shadow-2xl ${isSearchOpen ? 'translate-y-0' : '-translate-y-[150%]'}`}>
                    <div className="max-w-3xl mx-auto">
                        <div className="flex gap-4 items-center">
                            <button onClick={() => setIsSearchOpen(false)} className="text-white/30 hover:text-white">Close</button>
                        </div>
                        <p className="text-white mt-4">Search functionality coming soon...</p>
                    </div>
                </div>

                {/* Main Content */}
                <main id="main-content" className="flex-1">
                    <PageWrapper>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/episodes" element={<Episodes />} />
                            <Route path="/library" element={<Library />} />
                            <Route path="/black-lodge" element={<BlackLodge />} />
                            <Route path="/article/:id" element={<Article />} />
                        </Routes>
                    </PageWrapper>
                </main>

                {/* Footer */}
                <footer className="border-t border-white/5 bg-surface-darker px-6 py-16 lg:px-8 mt-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-white/70">Twin Peaks Japan</span>
                                </div>
                                <p className="font-body text-base text-white/40 italic max-w-xs">
                                    "The owls are not what they seem."
                                </p>
                            </div>
                            <div className="flex gap-12">
                                <div>
                                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Archive</h4>
                                    <ul className="space-y-2">
                                        <li><Link to="/episodes" className="nav-link font-body text-sm text-white/50 hover:text-primary transition-colors">エピソード</Link></li>
                                        <li><Link to="/library" className="nav-link font-body text-sm text-white/50 hover:text-primary transition-colors">資料室</Link></li>
                                        <li><Link to="/black-lodge" className="nav-link font-body text-sm text-white/50 hover:text-primary transition-colors">ブラックロッジ</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-white/5">
                            <p className="font-mono text-[10px] text-white/20 uppercase tracking-wider text-center">
                                A fan tribute. Not affiliated with Showtime or David Lynch.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
