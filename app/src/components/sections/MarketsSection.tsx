import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, RefreshCw, AlertCircle } from 'lucide-react';
import type { MarketWithStatus } from '@/types/market';
import { Button } from '@/components/ui/button';

interface MarketsSectionProps {
  marketData: MarketWithStatus[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  lastUpdated: Date;
}

import { ModernMarketHub } from '@/components/markets/ModernMarketHub';

export const MarketsSection: React.FC<MarketsSectionProps> = ({
  marketData,
  loading,
  error,
  onRefresh,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="markets" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Globe className="h-4 w-4 mr-2" />
            Market Control Center
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Global Market Intelligence
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Interactive world map and live session tracking. Select a market to dive deep into its data.
          </p>
        </motion.div>

        {/* Intelligence Hub */}
        {!loading && marketData.length > 0 && (
          <ModernMarketHub marketData={marketData} />
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-red-500 mb-2">
              <AlertCircle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Intelligence Error</h3>
            </div>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={onRefresh} variant="outline">
              Reconnect to Terminal
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && marketData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Market Data Available
            </h3>
            <p className="text-muted-foreground mb-4">
              Unable to load market data. Please check your connection and try again.
            </p>
            <Button onClick={onRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
