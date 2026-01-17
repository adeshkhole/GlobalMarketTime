export type MarketStatus = 'open' | 'closed' | 'opening_soon' | 'closing_soon' | 'lunch';

export interface Market {
  id: string;
  name: string;
  country: string;
  flag: string;
  index: string;
  timezone: string;
  tradingHours: {
    open: string;
    close: string;
    lunch?: {
      start: string;
      end: string;
    };
  };
  tradingDays: number[];
  holidays: string[];
  dataSource: string;
}

export interface MarketStatusInfo {
  status: MarketStatus;
  localTime: Date;
  timeUntilOpen?: number;
  timeUntilClose?: number;
  isTradingDay: boolean;
  isHoliday: boolean;
  nextOpen?: Date;
  nextClose?: Date;
}

export interface MarketWithStatus extends Market {
  statusInfo: MarketStatusInfo;
}
