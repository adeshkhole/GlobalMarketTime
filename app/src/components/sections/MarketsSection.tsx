import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, RefreshCw } from 'lucide-react';
import type { MarketWithStatus } from '@/types/market';
import { MarketCard } from '@/components/markets/MarketCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MarketsSectionProps {
  marketData: MarketWithStatus[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  lastUpdated: Date;
}

export const MarketsSection: React.FC<MarketsSectionProps> = ({
  marketData,
  loading,
  error,
  onRefresh,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Group markets by region
  const asiaPacificMarkets = marketData.filter(m =>
    ['India', 'Japan', 'Hong Kong', 'China', 'Australia', 'South Korea'].includes(m.country)
  );

  const europeanMarkets = marketData.filter(m =>
    ['Germany', 'United Kingdom', 'European Union', 'Switzerland'].includes(m.country)
  );

  const americanMarkets = marketData.filter(m =>
    ['United States', 'Canada', 'Brazil'].includes(m.country)
  );

  const getOpenMarketsCount = (markets: MarketWithStatus[]) => {
    return markets.filter(m => m.statusInfo.status === 'open' || m.statusInfo.status === 'lunch').length;
  };

  const MarketCategory: React.FC<{
    title: string;
    markets: MarketWithStatus[];
    icon: string;
  }> = ({ title, markets, icon }) => {
    const openCount = getOpenMarketsCount(markets);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{icon}</span>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              {openCount} Open
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, index) => (
            <MarketCard
              key={market.id}
              market={market}
              index={index}
              loading={loading}
            />
          ))}
        </div>
      </motion.div>
    );
  };

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
            Live Market Data
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Global Market Status
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Track real-time status of stock markets around the world. See which markets are open,
            closed, or opening soon.
          </p>

          {/* Refresh Button Removed */}

        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-8 text-center"
          >
            <h3 className="text-lg font-semibold text-red-500 mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={onRefresh} variant="outline">
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Market Categories */}
        {asiaPacificMarkets.length > 0 && (
          <MarketCategory
            title="Asia-Pacific Markets"
            markets={asiaPacificMarkets}
            icon="🌏"
          />
        )}

        {europeanMarkets.length > 0 && (
          <MarketCategory
            title="European Markets"
            markets={europeanMarkets}
            icon="🇪🇺"
          />
        )}

        {americanMarkets.length > 0 && (
          <MarketCategory
            title="American Markets"
            markets={americanMarkets}
            icon="🌎"
          />
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
