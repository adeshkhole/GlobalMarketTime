import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { marketService } from '@/services/marketService';

const CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
];

const INITIAL_RATES: Record<string, number> = {
    'USD': 1,
    'INR': 83.12,
    'EUR': 0.92,
    'GBP': 0.79,
    'JPY': 149.85,
    'AUD': 1.53,
};

export const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [rates, setRates] = useState(INITIAL_RATES);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const fetchRates = async () => {
            setIsRefreshing(true);
            try {
                // Fetch rate for 'USD' to current 'toCurrency' as base
                // Alpha Vantage free tier is limited, so we fetch only what's needed
                const rateData = await marketService.getExchangeRate(fromCurrency, toCurrency);
                if (rateData) {
                    setRates(prev => ({
                        ...prev,
                        [toCurrency]: rateData.rate,
                        [fromCurrency]: 1 // Simplified: assume 'from' is 1 if it's the base of the fetch
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch rates', error);
            } finally {
                setIsRefreshing(false);
            }
        };

        fetchRates();
        const interval = setInterval(fetchRates, 60 * 60 * 1000); // Refresh every hour
        return () => clearInterval(interval);
    }, [fromCurrency, toCurrency]);

    const convert = (val: number, from: string, to: string) => {
        if (from === to) return val.toFixed(2);
        // If we have the direct rate from our fetch
        if (from === fromCurrency && to === toCurrency) {
            return (val * rates[to]).toFixed(2);
        }
        // Fallback to basic math if rates are known (simulated or cached)
        const usdAmount = val / rates[from];
        return (usdAmount * rates[to]).toFixed(2);
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Pass 'true' to ignore cache and get absolute latest price
        const rateData = await marketService.getExchangeRate(fromCurrency, toCurrency, true);
        if (rateData) {
            setRates(prev => ({
                ...prev,
                [toCurrency]: rateData.rate
            }));
        }
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <Card className="border-border/50 bg-background/50 backdrop-blur-md shadow-xl overflow-hidden group">
            <CardHeader className="pb-4 border-b border-border/10">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold flex items-center space-x-2">
                        <ArrowRightLeft className="h-5 w-5 text-primary" />
                        <span>Currency Converter</span>
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRefresh}
                        className={isRefreshing ? 'animate-spin' : ''}
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="text-lg font-mono font-bold"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">From</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                        </select>
                    </div>

                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={handleSwap}
                        className="mt-6 rounded-full hover:rotate-180 transition-transform duration-500"
                    >
                        <ArrowRightLeft className="h-4 w-4" />
                    </Button>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">To</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="relative pt-4 text-center">
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <span className="text-8xl font-black italic select-none uppercase tracking-tighter">Live</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{amount} {fromCurrency} =</p>
                        <motion.h4
                            key={amount + fromCurrency + toCurrency + rates[toCurrency]}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl font-mono font-black text-primary"
                        >
                            {convert(amount, fromCurrency, toCurrency)} {toCurrency}
                        </motion.h4>
                        <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span>Real-time Rates via Alpha Vantage</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
