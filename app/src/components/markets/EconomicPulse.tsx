import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';
import { marketService } from '@/services/marketService';

interface IndicatorData {
    value: string;
    date: string;
    label: string;
    unit: string;
}

export const EconomicPulse: React.FC = () => {
    const [indicators, setIndicators] = useState<Record<string, IndicatorData | null>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [gdp, cpi, rates] = await Promise.all([
                    marketService.getEconomicIndicator('REAL_GDP'),
                    marketService.getEconomicIndicator('CPI'),
                    marketService.getEconomicIndicator('FEDERAL_FUNDS_RATE')
                ]);

                setIndicators({
                    gdp: gdp ? { ...gdp, label: 'Real GDP', unit: 'Billion $' } : null,
                    cpi: cpi ? { ...cpi, label: 'CPI (Inflation)', unit: 'Index' } : null,
                    rates: rates ? { ...rates, label: 'Fed Interest Rate', unit: '%' } : null
                });
            } catch (error) {
                console.error('Error fetching economic indicators:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    if (loading) {
        return (
            <div className="h-48 flex items-center justify-center bg-muted/5 border border-border/40 rounded-3xl animate-pulse">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Loading Economic Intelligence...</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(indicators).map((data, idx) => (
                data && (
                    <motion.div
                        key={data.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-background/40 backdrop-blur-md border border-border/40 p-5 rounded-2xl hover:border-primary/40 transition-colors group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                {idx === 0 ? <BarChart3 className="h-4 w-4" /> : idx === 1 ? <PieChart className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground opacity-50">{data.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{data.label}</h4>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-black text-foreground">{parseFloat(data.value).toLocaleString()}</span>
                            <span className="text-[10px] font-bold text-primary/60">{data.unit}</span>
                        </div>

                        {/* Subtle Growth Indicator (Placeholder for diff) */}
                        <div className="mt-4 flex items-center text-[10px] font-bold text-green-500">
                            <Activity className="h-3 w-3 mr-1" />
                            <span>Live Market Data Feed</span>
                        </div>
                    </motion.div>
                )
            ))}
        </div>
    );
};
