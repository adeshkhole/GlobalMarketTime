import { useState, useEffect, useCallback } from 'react';
import type { MarketWithStatus } from '@/types/market';
import { markets, getMarketStatus } from '@/utils/marketData';

export const useMarketStatus = (refreshInterval: number = 60000) => {
  const [marketData, setMarketData] = useState<MarketWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchMarketStatus = useCallback(() => {
    try {
      setError(null);

      const currentTime = new Date();
      const marketsWithStatus = markets.map(market => ({
        ...market,
        statusInfo: getMarketStatus(market, currentTime),
      }));

      setMarketData(marketsWithStatus);
      setLastUpdated(currentTime);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketStatus();

    // Set up auto-refresh
    const interval = setInterval(fetchMarketStatus, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchMarketStatus, refreshInterval]);

  const refresh = () => {
    fetchMarketStatus();
  };

  return {
    marketData,
    loading,
    error,
    lastUpdated,
    refresh,
  };
};
