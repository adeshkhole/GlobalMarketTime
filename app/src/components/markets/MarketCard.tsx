import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, AlertCircle } from 'lucide-react';
import type { MarketWithStatus } from '@/types/market';
import { useCountdown } from '@/hooks/useCountdown';
import { LiveClock } from '@/components/common/LiveClock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface MarketCardProps {
  market: MarketWithStatus;
  index: number;
  loading?: boolean;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market, index, loading }) => {
  const { status, nextOpen, nextClose } = market.statusInfo;

  const countdownTime = (status === 'open' || status === 'closing_soon')
    ? nextClose
    : nextOpen;

  const countdown = useCountdown(countdownTime || null);

  const getStatusColor = () => {
    switch (status) {
      case 'open':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'closed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'opening_soon':
      case 'closing_soon':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'lunch':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
      case 'opening_soon':
        return 'Opening Soon';
      case 'closing_soon':
        return 'Closing Soon';
      case 'lunch':
        return 'Lunch Break';
      default:
        return 'Unknown';
    }
  };

  const formatCountdownDisplay = () => {
    const parts = [];
    if (countdown.hours > 0) {
      parts.push(`${countdown.hours}h`);
    }
    if (countdown.minutes > 0 || countdown.hours > 0) {
      parts.push(`${countdown.minutes}m`);
    }
    parts.push(`${countdown.seconds}s`);
    return parts.join(' ');
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-full mb-3" />
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50">
        {/* Status Indicator Bar */}
        <motion.div
          className={`h-1 ${status === 'open' ? 'bg-green-500' : status === 'closed' ? 'bg-red-500' : 'bg-orange-500'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {/* Flag */}
              <motion.div
                className="text-3xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {market.flag}
              </motion.div>

              <div>
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {market.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {market.index}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <Badge
              variant="outline"
              className={`${getStatusColor()} font-medium`}
            >
              {getStatusText()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">


          {/* Local Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Local Time:</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              <LiveClock timezone={market.timezone} />
            </span>
          </div>

          {/* Countdown Timer */}
          {(status === 'opening_soon' || status === 'closing_soon' || status === 'open' || status === 'lunch') && countdownTime && (
            <motion.div
              className="bg-muted/50 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {status === 'opening_soon' ? 'Opens in:' : status === 'closing_soon' ? 'Closes in:' : status === 'open' ? 'Closes in:' : 'Lunch ends in:'}
                </span>
                <motion.span
                  key={formatCountdownDisplay()}
                  initial={{ scale: 1.1, color: 'rgb(59 130 246)' }}
                  animate={{ scale: 1, color: 'rgb(59 130 246)' }}
                  className="text-lg font-mono font-bold text-primary"
                >
                  {formatCountdownDisplay()}
                </motion.span>
              </div>
            </motion.div>
          )}

          {/* Trading Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Trading Hours:</span>
              <span className="text-foreground font-medium">
                {market.tradingHours.open} - {market.tradingHours.close}
              </span>
            </div>

            {market.tradingHours.lunch && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Lunch Break:</span>
                <span>
                  {market.tradingHours.lunch.start} - {market.tradingHours.lunch.end}
                </span>
              </div>
            )}
          </div>

          {/* Data Source */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <span className="text-xs text-muted-foreground">
              Source: {market.dataSource}
            </span>

            <motion.a
              href={`https://www.google.com/search?q=${encodeURIComponent(market.name + ' ' + market.index)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <span>Live Data</span>
              <ExternalLink className="h-3 w-3" />
            </motion.a>
          </div>

          {/* Status Messages */}
          {!market.statusInfo.isTradingDay && (
            <motion.div
              className="flex items-center space-x-2 text-xs text-orange-500 bg-orange-500/10 rounded px-3 py-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-3 w-3" />
              <span>Weekend - Market Closed</span>
            </motion.div>
          )}

          {market.statusInfo.isHoliday && (
            <motion.div
              className="flex items-center space-x-2 text-xs text-red-500 bg-red-500/10 rounded px-3 py-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-3 w-3" />
              <span>Holiday - Market Closed</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
