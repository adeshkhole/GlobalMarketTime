import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { marketService } from '@/services/marketService';

interface TickerItem {
    name: string;
    symbol: string;
    value: number;
    change: number;
    percentChange: number;
    type: 'index' | 'commodity' | 'forex';
}

const TICKER_DATA: TickerItem[] = [
    { name: 'NIFTY 50', symbol: 'NIFTY', value: 22032.55, change: 156.40, percentChange: 0.71, type: 'index' },
    { name: 'SENSEX', symbol: 'SENSEX', value: 72568.45, change: 485.30, percentChange: 0.67, type: 'index' },
    { name: 'GOLD', symbol: 'XAU', value: 2035.40, change: 12.20, percentChange: 0.60, type: 'commodity' },
    { name: 'S&P 500', symbol: '^GSPC', value: 5026.61, change: -12.45, percentChange: -0.25, type: 'index' },
    { name: 'NASDAQ', symbol: '^IXIC', value: 15990.66, change: 45.12, percentChange: 0.28, type: 'index' },
    { name: 'CRUDE OIL', symbol: 'WTI', value: 78.45, change: -0.65, percentChange: -0.82, type: 'commodity' },
    { name: 'DOW JONES', symbol: '^DJI', value: 38627.99, change: -54.64, percentChange: -0.14, type: 'index' },
    { name: 'NIKKEI 225', symbol: '^N225', value: 38487.24, change: 566.35, percentChange: 1.49, type: 'index' },
    { name: 'USD/INR', symbol: 'USDINR', value: 83.05, change: 0.02, percentChange: 0.02, type: 'forex' },
];

export const TickerTape: React.FC = () => {
    const [items, setItems] = useState<TickerItem[]>(TICKER_DATA);

    useEffect(() => {
        const updateTicker = async () => {
            try {
                const updated = await Promise.all(items.map(async (item) => {
                    let priceData = null;
                    if (item.type === 'index') {
                        priceData = await marketService.getGlobalQuote(item.symbol);
                    } else if (item.type === 'forex' || item.type === 'commodity') {
                        // For simplicity in this demo, we use exchange rate for forex/commodities
                        const rate = await marketService.getExchangeRate(item.symbol === 'USDINR' ? 'USD' : 'XAU', 'USD');
                        if (rate) {
                            priceData = { price: rate.rate, change: 0, changePercent: 0 };
                        }
                    }

                    if (priceData) {
                        return {
                            ...item,
                            value: priceData.price,
                            change: priceData.change,
                            percentChange: priceData.changePercent
                        };
                    }
                    return item;
                }));
                setItems(updated);
            } catch (e) {
                console.error("Ticker update failed", e);
            }
        };

        updateTicker();
        const interval = setInterval(updateTicker, 60 * 60 * 1000); // Update every hour to save API calls
        return () => clearInterval(interval);
    }, []);

    const getYahooLink = (symbol: string) => {
        if (symbol === 'NIFTY') return 'https://finance.yahoo.com/quote/%5ENSEI';
        if (symbol === 'SENSEX') return 'https://finance.yahoo.com/quote/%5EBSESN';
        if (symbol === 'USDINR') return 'https://finance.yahoo.com/quote/USDINR=X';
        if (symbol === 'XAU') return 'https://finance.yahoo.com/quote/GC=F';
        if (symbol === 'WTI') return 'https://finance.yahoo.com/quote/CL=F';
        return `https://finance.yahoo.com/quote/${symbol}`;
    };

    // Duplicate for seamless loop
    const doubledItems = [...items, ...items];
    return (
        <div className="w-full bg-background border-b border-border/40 overflow-hidden py-1 flex items-center group relative z-[100] h-8 shadow-sm">
            <motion.div
                className="flex items-center space-x-12 whitespace-nowrap pl-6"
                animate={{ x: [0, -items.length * 150] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 80,
                        ease: "linear"
                    }
                }}
            >
                {doubledItems.map((item, i) => (
                    <a
                        key={`${item.symbol}-${i}`}
                        href={getYahooLink(item.symbol)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 hover:bg-primary/5 px-3 py-1 rounded-md transition-all duration-200 group/item"
                    >
                        <span className="text-[11px] font-black text-foreground/60 uppercase tracking-tighter group-hover/item:text-primary transition-colors">
                            {item.name}
                        </span>

                        <ExternalLink className="h-2 w-2 opacity-0 group-hover/item:opacity-100 transition-opacity text-primary" />
                    </a>
                ))}
            </motion.div>
        </div>
    );
};
