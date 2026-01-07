import React, { useState, useEffect } from 'react';

const quotes = [
    { text: "The owls are not what they seem.", source: "The Giant" },
    { text: "Every day, once a day, give yourself a present.", source: "Dale Cooper" },
    { text: "Fire walk with me.", source: "The One Armed Man" },
    { text: "This must be where pies go when they die.", source: "Dale Cooper" },
    { text: "I have no idea where this will lead us, but I have a definite feeling it will be a place both wonderful and strange.", source: "Dale Cooper" },
    { text: "There is a man in a smiling bag.", source: "The Giant" },
    { text: "It is happening again.", source: "The Giant" },
    { text: "Diane, I'm holding in my hand a small box of chocolate bunnies.", source: "Dale Cooper" }
];

const DailyQuote = () => {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        // Pick a random quote on mount
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    if (!quote) return null;

    return (
        <div className="py-12 flex justify-center">
            <div className="max-w-2xl text-center px-6">
                <p className="font-display text-2xl md:text-3xl font-medium text-white/50 italic mb-4 leading-relaxed">
                    "{quote.text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-8 bg-primary/30"></div>
                    <p className="font-mono text-xs uppercase tracking-widest text-primary/70">
                        {quote.source}
                    </p>
                    <div className="h-px w-8 bg-primary/30"></div>
                </div>
            </div>
        </div>
    );
};

export default DailyQuote;
