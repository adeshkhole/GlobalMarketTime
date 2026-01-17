import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { marketService } from '@/services/marketService';

interface IndexData {
    name: string;
    symbol: string;
    value: number;
    change: number;
    percentChange: number;
}

const INITIAL_INDICES: IndexData[] = [
    { name: 'NIFTY 50', symbol: 'NIFTY', value: 22032.55, change: 156.40, percentChange: 0.71 },
    { name: 'SENSEX', symbol: 'SENSEX', value: 72568.45, change: 485.30, percentChange: 0.67 },
    { name: 'S&P 500', symbol: '^GSPC', value: 5026.61, change: -12.45, percentChange: -0.25 },
    { name: 'NASDAQ', symbol: '^IXIC', value: 15990.66, change: 45.12, percentChange: 0.28 },
    { name: 'Dow Jones', symbol: '^DJI', value: 38627.99, change: -54.64, percentChange: -0.14 },
    { name: 'FTSE 100', symbol: '^FTSE', value: 7622.34, change: 30.15, percentChange: 0.40 },
    { name: 'DAX', symbol: '^GDAXI', value: 17092.22, change: -15.40, percentChange: -0.09 },
    { name: 'Nikkei 225', symbol: '^N225', value: 38487.24, change: 566.35, percentChange: 1.49 },
    { name: 'Hang Seng', symbol: '^HSI', value: 16339.96, change: 395.33, percentChange: 2.48 },
];

export const GlobalIndicesTracker: React.FC = () => {
    const [indices, setIndices] = useState<IndexData[]>(INITIAL_INDICES);
    const [isLive, setIsLive] = useState(false);

    const isMarketActive = () => {
        const now = new Date();
        const day = now.getDay();
        const isWeekend = day === 0 || day === 6;
        if (isWeekend) return false;

        const hour = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hour * 60 + minutes;

        // Range: 5:30 AM to 3:00 AM IST (covering all major sessions)
        return totalMinutes >= 330 || totalMinutes <= 180;
    };

    useEffect(() => {
        const fetchRealTimeData = async (force: boolean = false) => {
            const active = isMarketActive();
            setIsLive(active);

            // Fetch if market is active OR if it's the first load (force)
            if (!active && !force) {
                return;
            }

            try {
                const updatedIndices = await Promise.all(
                    indices.map(async (idx) => {
                        const quote = await marketService.getGlobalQuote(idx.symbol);
                        if (quote) {
                            return {
                                ...idx,
                                value: quote.price,
                                change: quote.change,
                                percentChange: quote.changePercent,
                            };
                        }
                        return idx;
                    })
                );
                setIndices(updatedIndices);
            } catch (error) {
                console.error("Failed to fetch global indices:", error);
            }
        };

        // Fetch once on mount to get the last close price, even if weekend
        fetchRealTimeData(true);

        // Polling interval: Only runs often if market is active
        const interval = setInterval(() => fetchRealTimeData(false), isMarketActive() ? 30 * 60 * 1000 : 4 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Random movement simulation removed as it was confusing

    const scrollingItems = [...indices, ...indices];

    return (
        <div className="w-full bg-primary/5 border-b border-primary/10 overflow-hidden py-2 whitespace-nowrap relative z-[60]">
            <div className="flex items-center">
                {/* Live Indicator */}
                <div className="absolute left-0 top-0 bottom-0 px-3 bg-background/80 backdrop-blur-md z-10 flex items-center shadow-lg">
                    <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center">
                            {isLive ? 'Live' : 'Market Closed'}
                        </span>
                    </div>
                </div>

                <motion.div
                    className="flex space-x-8 px-4 ml-24"
                    animate={{ x: [0, -2000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50,
                            ease: "linear"
                        }
                    }}
                >
                    {scrollingItems.map((idx, i) => (
                        <div key={`${idx.name}-${i}`} className="flex items-center space-x-2 px-4 border-r border-primary/10 last:border-0 h-8">
                            <span className="text-xs font-bold text-foreground/80 uppercase tracking-wider">{idx.name}</span>
                            <span className="text-sm font-mono font-medium text-foreground">
                                {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <div className={`flex items-center space-x-1 text-xs font-bold ${idx.change > 0 ? 'text-green-500' : idx.change < 0 ? 'text-red-500' : 'text-muted-foreground'
                                }`}>
                                {idx.change > 0 ? <TrendingUp className="h-3 w-3" /> : idx.change < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                                <span>{idx.change > 0 ? '+' : ''}{idx.change.toFixed(2)}</span>
                                <span className="text-[10px] opacity-80">({idx.change > 0 ? '+' : ''}{idx.percentChange.toFixed(2)}%)</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
