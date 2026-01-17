import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, Globe, Zap, ArrowRight, MapPin } from 'lucide-react';
import type { MarketWithStatus } from '@/types/market';
import { LiveClock } from '@/components/common/LiveClock';
import { Badge } from '@/components/ui/badge';

interface ModernMarketHubProps {
    marketData: MarketWithStatus[];
}

export const ModernMarketHub: React.FC<ModernMarketHubProps> = ({ marketData }) => {
    const [selectedId, setSelectedId] = useState<string>(marketData[0]?.id || '');
    const [isPaused, setIsPaused] = useState(false);
    const selectedMarket = marketData.find(m => m.id === selectedId) || marketData[0];

    // Auto-cycle logic
    useEffect(() => {
        if (isPaused) {
            const timer = setTimeout(() => setIsPaused(false), 20000); // Resume after 20s of inactivity
            return () => clearTimeout(timer);
        }

        const interval = setInterval(() => {
            setSelectedId(current => {
                const currentIndex = marketData.findIndex(m => m.id === current);
                const nextIndex = (currentIndex + 1) % marketData.length;
                return marketData[nextIndex].id;
            });
        }, 6000); // Switch every 6 seconds

        return () => clearInterval(interval);
    }, [isPaused, marketData.length]);

    const handleManualSelect = (id: string) => {
        setSelectedId(id);
        setIsPaused(true); // Pause auto-cycle when user takes control
    };

    const regions = useMemo(() => {
        const r = {
            'Asia-Pacific': marketData.filter(m => ['India', 'Japan', 'Hong Kong', 'China', 'Australia', 'South Korea'].includes(m.country)),
            'Europe': marketData.filter(m => ['Germany', 'United Kingdom', 'European Union', 'Switzerland'].includes(m.country)),
            'Americas': marketData.filter(m => ['United States', 'Canada', 'Brazil'].includes(m.country))
        };
        return r;
    }, [marketData]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'closed': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'lunch': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        }
    };

    // Approximate Map Coordinates (Holographic style)
    const marketCoords: Record<string, { x: string, y: string }> = {
        'nse_bse': { x: '70%', y: '58%' },
        'tse': { x: '88%', y: '40%' },
        'hkex': { x: '80%', y: '55%' },
        'sse': { x: '78%', y: '48%' },
        'asx': { x: '88%', y: '82%' },
        'deutsche_borse': { x: '51%', y: '32%' },
        'lse': { x: '47%', y: '30%' },
        'nyse': { x: '22%', y: '42%' },
        'nasdaq': { x: '24%', y: '40%' },
        'tsx': { x: '20%', y: '30%' },
        'b3': { x: '35%', y: '75%' },
        'euronext': { x: '52%', y: '35%' },
        'six_swiss': { x: '50%', y: '38%' },
        'krx': { x: '85%', y: '42%' }
    };

    const getCoord = (id: string) => marketCoords[id] || { x: '50%', y: '50%' };

    return (
        <div className="relative w-full max-w-7xl mx-auto border border-border/40 rounded-3xl overflow-hidden bg-background/50 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row h-auto lg:h-[700px]">

            {/* Left Panel: Market Navigation */}
            <div className="w-full lg:w-80 border-r border-border/40 p-6 flex flex-col bg-muted/10">
                <div className="flex flex-col space-y-2 mb-8 bg-background/40 p-4 rounded-2xl border border-border/20 backdrop-blur-md relative overflow-hidden group">
                    <div className="flex items-center space-x-2 relative z-10">
                        <motion.div
                            animate={isPaused ? {} : { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className={`h-5 w-5 ${isPaused ? 'text-muted-foreground' : 'text-primary'}`} />
                        </motion.div>
                        <h3 className="font-black text-sm uppercase tracking-widest text-foreground">Global Control</h3>
                    </div>

                    <div className="flex items-center space-x-2 relative z-10">
                        <div className={`h-1.5 w-1.5 rounded-full ${isPaused ? 'bg-orange-500' : 'bg-primary animate-pulse'}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isPaused ? 'text-orange-500' : 'text-primary'}`}>
                            {isPaused ? 'Manual Override' : 'Surveillance Active'}
                        </span>
                    </div>

                    {!isPaused && (
                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-primary/40"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </div>

                <div className="flex-grow h-[400px] lg:h-full overflow-hidden relative">
                    <motion.div
                        className="space-y-8 pb-32"
                        animate={{ y: [0, -500] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        onMouseEnter={(e) => {
                            // @ts-ignore
                            e.currentTarget.style.animationPlayState = 'paused';
                        }}
                    >
                        {[...Object.entries(regions), ...Object.entries(regions)].map(([name, markets], groupIdx) => (
                            <div key={`${name}-${groupIdx}`}>
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
                                    {name}
                                    <span className="text-primary">{markets.filter(m => m.statusInfo.status === 'open').length} Open</span>
                                </h4>
                                <div className="space-y-1">
                                    {markets.map(m => (
                                        <button
                                            key={`${m.id}-${groupIdx}`}
                                            onClick={() => handleManualSelect(m.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-300 ${selectedId === m.id
                                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span>{m.flag}</span>
                                                <span className="font-semibold">{m.name.split(' ')[0]}</span>
                                            </div>
                                            <div className={`h-1.5 w-1.5 rounded-full ${m.statusInfo.status === 'open' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.4)]'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Fade Overlays for Scroll */}
                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-muted/10 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-muted/10 to-transparent z-10 pointer-events-none" />
                </div>
            </div>

            {/* Center: Interactive Holographic Map */}
            <div className="flex-grow relative bg-background/20 p-8 hidden lg:flex items-center justify-center overflow-hidden">
                {/* Stylized Grid SVG Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Holographic Scanner Line */}
                <motion.div
                    className="absolute inset-x-0 h-[2px] bg-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.8)] z-10 pointer-events-none"
                    animate={{ y: ['0%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* World Map Concept (Simplified Stylized) */}
                <div className="relative w-full h-full max-w-4xl max-h-[500px]">
                    <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full text-muted opacity-[0.03] scale-150" />

                    {/* Market Pins */}
                    {marketData.map(m => {
                        const { x, y } = getCoord(m.id);
                        const isActive = selectedId === m.id;
                        return (
                            <motion.button
                                key={m.id}
                                onClick={() => handleManualSelect(m.id)}
                                className="absolute"
                                style={{ left: x, top: y }}
                                animate={{ scale: isActive ? 1.5 : 1 }}
                                whileHover={{ scale: 1.8 }}
                            >
                                <div className="relative">
                                    <div className={`h-3 w-3 rounded-full border-2 border-background shadow-2xl transition-all duration-500 ${isActive ? 'bg-primary scale-125' : m.statusInfo.status === 'open' ? 'bg-green-500' : 'bg-red-500'}`} />

                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-background/90 border border-primary/40 rounded-lg shadow-2xl text-[10px] font-black text-primary whitespace-nowrap z-50 backdrop-blur-md uppercase tracking-widest"
                                        >
                                            {m.name}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Right Panel: Intelligence Deep-Dive */}
            <div className="w-full lg:w-96 border-l border-border/40 p-8 flex flex-col bg-primary/[0.02]">
                <AnimatePresence mode="wait">
                    {selectedMarket && (
                        <motion.div
                            key={selectedMarket.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col h-full"
                        >
                            {/* Header Info */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="text-4xl">{selectedMarket.flag}</div>
                                <Badge className={`text-xs uppercase font-black px-4 py-1 rounded-full border ${getStatusColor(selectedMarket.statusInfo.status)}`}>
                                    {selectedMarket.statusInfo.status.replace('_', ' ')}
                                </Badge>
                            </div>

                            <h2 className="text-2xl font-black text-foreground mb-1 leading-none">{selectedMarket.name}</h2>
                            <p className="text-sm text-primary font-mono font-bold tracking-widest mb-8 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {selectedMarket.index}
                            </p>

                            {/* Live Metrics */}
                            <div className="space-y-6 relative">
                                <div className="bg-muted/30 p-5 rounded-2xl border border-border/20 backdrop-blur-md">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Local Session Time</span>
                                        <Clock className="h-4 w-4 text-primary opacity-50" />
                                    </div>
                                    <div className="text-3xl font-mono font-black text-foreground">
                                        <LiveClock timezone={selectedMarket.timezone} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Trading Hours</div>
                                        <div className="text-sm font-black text-foreground">{selectedMarket.tradingHours.open} - {selectedMarket.tradingHours.close}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Lunch Break</div>
                                        <div className="text-sm font-black text-foreground">
                                            {selectedMarket.tradingHours.lunch ? `${selectedMarket.tradingHours.lunch.start} - ${selectedMarket.tradingHours.lunch.end}` : 'N/A'}
                                        </div>
                                    </div>
                                </div>

                                {/* Status Alerts */}
                                <div className="space-y-2">
                                    {!selectedMarket.statusInfo.isTradingDay && (
                                        <div className="flex items-center space-x-3 p-4 bg-orange-500/5 text-orange-500 border-l-2 border-orange-500 rounded-sm text-[10px] font-mono font-bold tracking-tighter uppercase italic animate-pulse">
                                            <AlertCircle className="h-4 w-4 shrink-0" />
                                            <span>CRITICAL: MARKET_IN_STASIS (WEEKEND)</span>
                                        </div>
                                    )}
                                    {selectedMarket.statusInfo.isHoliday && (
                                        <div className="flex items-center space-x-3 p-4 bg-red-500/5 text-red-500 border-l-2 border-red-500 rounded-sm text-[10px] font-mono font-bold tracking-tighter uppercase italic">
                                            <AlertCircle className="h-4 w-4 shrink-0" />
                                            <span>ALERT: OFFICIAL_EXCHANGE_HOLIDAY</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto pt-8">
                                <motion.a
                                    href={`https://www.google.com/search?q=${encodeURIComponent(selectedMarket.name + ' ' + selectedMarket.index)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center space-x-2 bg-foreground text-background font-black text-xs uppercase py-4 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all group"
                                    whileHover={{ y: -4 }}
                                >
                                    <span>Access Exchange Intelligence</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                                <p className="text-[9px] text-muted-foreground text-center mt-4 tracking-widest uppercase">
                                    Intelligence Provider: {selectedMarket.dataSource}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
};
