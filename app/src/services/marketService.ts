const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.alphavantage.co/query';

interface CacheItem<T> {
    data: T;
    timestamp: number;
}

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
const NEWS_CACHE_DURATION = 60 * 60 * 1000; // 1 hour for news

const getFromCache = <T>(key: string): T | null => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    try {
        const item: CacheItem<T> = JSON.parse(cached);
        const now = Date.now();
        const duration = key.startsWith('news_') ? NEWS_CACHE_DURATION : CACHE_DURATION;

        if (now - item.timestamp < duration) {
            return item.data;
        }
        localStorage.removeItem(key);
    } catch (e) {
        localStorage.removeItem(key);
    }
    return null;
};

const setToCache = <T>(key: string, data: T) => {
    const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export interface MarketQuote {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
}

export interface ExchangeRate {
    from: string;
    to: string;
    rate: number;
}

export interface NewsArticle {
    title: string;
    url: string;
    time_published: string;
    authors: string[];
    summary: string;
    banner_image: string;
    source: string;
    overall_sentiment_score: number;
    overall_sentiment_label: string;
}

export const marketService = {
    async getGlobalQuote(symbol: string): Promise<MarketQuote | null> {
        const cacheKey = `quote_${symbol}`;
        const cachedData = getFromCache<MarketQuote>(cacheKey);

        if (cachedData) return cachedData;

        if (!API_KEY) {
            console.error('Alpha Vantage API Key is missing! Check your .env file or GitHub Secrets.');
            return null;
        }

        try {
            console.log(`Fetching quote for ${symbol}...`);
            const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data['Global Quote'] && data['Global Quote']['05. price']) {
                const quote: MarketQuote = {
                    symbol: data['Global Quote']['01. symbol'],
                    price: parseFloat(data['Global Quote']['05. price']),
                    change: parseFloat(data['Global Quote']['09. change']),
                    changePercent: parseFloat(data['Global Quote']['10. change percent'].replace('%', '')),
                };

                setToCache(cacheKey, quote);
                return quote;
            } else if (data['Note'] || data['Information']) {
                console.warn(`Alpha Vantage API Message for ${symbol}:`, data['Note'] || data['Information']);
            } else if (data['Error Message']) {
                console.error(`Alpha Vantage API Error for ${symbol}:`, data['Error Message']);
            }
            return null;
        } catch (error) {
            console.error(`Error fetching quote for ${symbol}:`, error);
            return null;
        }
    },

    async getExchangeRate(from: string, to: string, ignoreCache: boolean = false): Promise<ExchangeRate | null> {
        const cacheKey = `rate_${from}_${to}`;

        if (!ignoreCache) {
            const cachedData = getFromCache<ExchangeRate>(cacheKey);
            if (cachedData) return cachedData;
        }

        if (!API_KEY) return null;

        try {
            const response = await fetch(`${BASE_URL}?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data['Realtime Currency Exchange Rate']) {
                const rate: ExchangeRate = {
                    from: data['Realtime Currency Exchange Rate']['1. From_Currency Code'],
                    to: data['Realtime Currency Exchange Rate']['3. To_Currency Code'],
                    rate: parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']),
                };

                setToCache(cacheKey, rate);
                return rate;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching exchange rate for ${from} to ${to}:`, error);
            return null;
        }
    },

    async getNewsSentiment(tickers?: string): Promise<NewsArticle[]> {
        const cacheKey = `news_${tickers || 'general'}`;
        const cachedData = getFromCache<NewsArticle[]>(cacheKey);

        if (cachedData) return cachedData;

        if (!API_KEY) {
            console.error('Alpha Vantage API Key is missing for News Fetch!');
            return [];
        }

        try {
            const tickersParam = tickers ? `&tickers=${tickers}` : '';
            console.log('Fetching News & Sentiment...');
            const response = await fetch(`${BASE_URL}?function=NEWS_SENTIMENT${tickersParam}&limit=10&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.feed) {
                const news: NewsArticle[] = data.feed.map((item: any) => ({
                    title: item.title,
                    url: item.url,
                    time_published: item.time_published,
                    authors: item.authors,
                    summary: item.summary,
                    banner_image: item.banner_image,
                    source: item.source,
                    overall_sentiment_score: item.overall_sentiment_score,
                    overall_sentiment_label: item.overall_sentiment_label,
                }));

                setToCache(cacheKey, news);
                return news;
            } else if (data['Note']) {
                console.warn('⚠️ Alpha Vantage Rate Limit Hit:', data['Note']);
                return [];
            } else if (data['Information']) {
                console.warn('ℹ️ Alpha Vantage Info:', data['Information']);
                return [];
            }
            console.error('Unexpected API Response:', data);
            return [];
        } catch (error) {
            console.error('Error fetching news sentiment:', error);
            return [];
        }
    }
};
