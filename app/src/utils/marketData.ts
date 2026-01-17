import type { Market, MarketStatusInfo } from '@/types/market';

// Holiday lists for 2026 (YYYY-MM-DD format)
const indiaHolidays2026 = [
  '2026-01-26', // Republic Day
  '2026-03-03', // Holi
  '2026-03-26', // Shri Ram Navami
  '2026-03-31', // Shri Mahavir Jayanti
  '2026-04-03', // Good Friday
  '2026-04-14', // Dr. Baba Saheb Ambedkar Jayanti
  '2026-05-01', // Maharashtra Day
  '2026-05-28', // Bakri Id
  '2026-06-26', // Muharram
  '2026-09-14', // Ganesh Chaturthi
  '2026-10-02', // Mahatma Gandhi Jayanti
  '2026-10-20', // Dussehra
  '2026-11-10', // Diwali-Balipratipada
  '2026-11-24', // Guru Nanak Jayanti
  '2026-12-25', // Christmas
];

const usHolidays2026 = [
  '2026-01-01', // New Year's Day
  '2026-01-19', // Martin Luther King Jr. Day
  '2026-02-16', // Washington's Birthday (Presidents' Day)
  '2026-04-03', // Good Friday
  '2026-05-25', // Memorial Day
  '2026-06-19', // Juneteenth National Independence Day
  '2026-07-03', // Independence Day (Observed)
  '2026-09-07', // Labor Day
  '2026-11-26', // Thanksgiving Day
  '2026-12-25', // Christmas Day
];

const ukHolidays2026 = [
  '2026-01-01', // New Year
  '2026-04-03', // Good Friday
  '2026-04-06', // Easter Monday
  '2026-05-04', // Early May
  '2026-05-25', // Spring Bank Holiday
  '2026-08-31', // Summer Bank Holiday
  '2026-12-25', // Christmas
  '2026-12-28', // Boxing Day (substitute)
];

export const markets: Market[] = [
  // Asia-Pacific Markets
  {
    id: 'nse_bse',
    name: 'NSE & BSE',
    country: 'India',
    flag: '🇮🇳',
    index: 'Nifty 50 / Sensex',
    timezone: 'Asia/Kolkata',
    tradingHours: {
      open: '09:15',
      close: '15:30',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: indiaHolidays2026,
    dataSource: 'NSE | BSE',
  },
  {
    id: 'tse',
    name: 'Tokyo Stock Exchange',
    country: 'Japan',
    flag: '🇯🇵',
    index: 'Nikkei 225',
    timezone: 'Asia/Tokyo',
    tradingHours: {
      open: '09:00',
      close: '15:00',
      lunch: {
        start: '11:30',
        end: '12:30',
      },
    },

    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-01-12', '2026-02-11', '2026-02-23', '2026-03-20',
      '2026-04-29', '2026-05-03', '2026-05-04', '2026-05-05', '2026-05-06',
      '2026-07-20', '2026-08-11', '2026-09-21', '2026-09-22', '2026-09-23',
      '2026-10-12', '2026-11-03', '2026-11-23', '2026-12-31'
    ],
    dataSource: 'TSE',
  },
  {
    id: 'hkex',
    name: 'Hong Kong Exchange',
    country: 'Hong Kong',
    flag: '🇭🇰',
    index: 'Hang Seng',
    timezone: 'Asia/Hong_Kong',
    tradingHours: {
      open: '09:30',
      close: '16:00',
      lunch: {
        start: '12:00',
        end: '13:00',
      },
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-02-17', '2026-02-18', '2026-04-03', '2026-04-06',
      '2026-05-01', '2026-06-19', '2026-07-01', '2026-10-01', '2026-10-14',
      '2026-12-25', '2026-12-26'
    ],
    dataSource: 'HKEX',
  },
  {
    id: 'sse',
    name: 'Shanghai Stock Exchange',
    country: 'China',
    flag: '🇨🇳',
    index: 'SSE Composite',
    timezone: 'Asia/Shanghai',
    tradingHours: {
      open: '09:30',
      close: '15:00',
      lunch: {
        start: '11:30',
        end: '13:00',
      },
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-01-02', '2026-01-03', '2026-02-16', '2026-02-17',
      '2026-02-18', '2026-02-19', '2026-02-20', '2026-02-23', '2026-02-24',
      '2026-04-06', '2026-05-01', '2026-06-19', '2026-10-01', '2026-10-02',
      '2026-10-05', '2026-10-06', '2026-10-07'
    ],
    dataSource: 'SSE',
  },
  {
    id: 'asx',
    name: 'Australian Securities Exchange',
    country: 'Australia',
    flag: '🇦🇺',
    index: 'ASX 200',
    timezone: 'Australia/Sydney',
    tradingHours: {
      open: '10:00',
      close: '16:00',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-01-26', '2026-04-03', '2026-04-06', '2026-04-27',
      '2026-06-08', '2026-08-03', '2026-10-05', '2026-12-25', '2026-12-28'
    ],
    dataSource: 'ASX',
  },
  {
    id: 'krx',
    name: 'Korea Exchange',
    country: 'South Korea',
    flag: '🇰🇷',
    index: 'KOSPI',
    timezone: 'Asia/Seoul',
    tradingHours: {
      open: '09:00',
      close: '15:30',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-02-16', '2026-02-17', '2026-02-18', '2026-03-01',
      '2026-05-05', '2026-05-25', '2026-06-06', '2026-08-17', '2026-10-03',
      '2026-10-05', '2026-10-06', '2026-10-09', '2026-12-25'
    ],
    dataSource: 'KRX',
  },
  // European Markets
  {
    id: 'deutsche_borse',
    name: 'Deutsche Börse',
    country: 'Germany',
    flag: '🇩🇪',
    index: 'DAX 40',
    timezone: 'Europe/Berlin',
    tradingHours: {
      open: '09:00',
      close: '17:30',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-01', '2026-05-14',
      '2026-05-25', '2026-10-03', '2026-12-25', '2026-12-26'
    ],
    dataSource: 'Deutsche Börse',
  },
  {
    id: 'lse',
    name: 'London Stock Exchange',
    country: 'United Kingdom',
    flag: '🇬🇧',
    index: 'FTSE 100',
    timezone: 'Europe/London',
    tradingHours: {
      open: '08:00',
      close: '16:30',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: ukHolidays2026,
    dataSource: 'LSE',
  },
  {
    id: 'euronext',
    name: 'Euronext',
    country: 'European Union',
    flag: '🇪🇺',
    index: 'CAC 40 / AEX',
    timezone: 'Europe/Paris',
    tradingHours: {
      open: '09:00',
      close: '17:30',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-01', '2026-05-14',
      '2026-05-25', '2026-06-04', '2026-07-14', '2026-08-15', '2026-11-01',
      '2026-11-11', '2026-12-25'
    ],
    dataSource: 'Euronext',
  },
  {
    id: 'six_swiss',
    name: 'SIX Swiss Exchange',
    country: 'Switzerland',
    flag: '🇨🇭',
    index: 'SMI',
    timezone: 'Europe/Zurich',
    tradingHours: {
      open: '09:00',
      close: '17:30',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-01-02', '2026-04-03', '2026-04-06', '2026-05-01',
      '2026-05-14', '2026-05-25', '2026-08-01', '2026-12-25'
    ],
    dataSource: 'SIX Swiss',
  },
  // American Markets
  {
    id: 'nyse',
    name: 'New York Stock Exchange',
    country: 'United States',
    flag: '🇺🇸',
    index: 'S&P 500 / Dow',
    timezone: 'America/New_York',
    tradingHours: {
      open: '09:30',
      close: '16:00',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: usHolidays2026,
    dataSource: 'NYSE',
  },
  {
    id: 'nasdaq',
    name: 'NASDAQ',
    country: 'United States',
    flag: '🇺🇸',
    index: 'NASDAQ Composite',
    timezone: 'America/New_York',
    tradingHours: {
      open: '09:30',
      close: '16:00',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: usHolidays2026,
    dataSource: 'NASDAQ',
  },
  {
    id: 'tsx',
    name: 'Toronto Stock Exchange',
    country: 'Canada',
    flag: '🇨🇦',
    index: 'S&P/TSX',
    timezone: 'America/Toronto',
    tradingHours: {
      open: '09:30',
      close: '16:00',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-02-16', '2026-04-03', '2026-05-18', '2026-07-01',
      '2026-08-03', '2026-09-07', '2026-10-12', '2026-11-11', '2026-12-25'
    ],
    dataSource: 'TSX',
  },
  {
    id: 'b3',
    name: 'B3 (Brazil)',
    country: 'Brazil',
    flag: '🇧🇷',
    index: 'Bovespa',
    timezone: 'America/Sao_Paulo',
    tradingHours: {
      open: '10:00',
      close: '17:00',
    },
    tradingDays: [1, 2, 3, 4, 5],
    holidays: [
      '2026-01-01', '2026-02-16', '2026-02-17', '2026-04-03', '2026-04-21',
      '2026-05-01', '2026-06-04', '2026-09-07', '2026-10-12', '2026-11-02',
      '2026-11-15', '2026-12-25'
    ],
    dataSource: 'B3',
  },
];

// Utility functions
export const convertToTimezone = (date: Date, timezone: string): Date => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  const dateParts: { [key: string]: string } = {};
  parts.forEach(part => {
    dateParts[part.type] = part.value;
  });

  return new Date(
    parseInt(dateParts.year),
    parseInt(dateParts.month) - 1,
    parseInt(dateParts.day),
    parseInt(dateParts.hour),
    parseInt(dateParts.minute),
    parseInt(dateParts.second)
  );
};

export const getMinutesFromTimeString = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const getMinutesFromTime = (date: Date): number => {
  return date.getHours() * 60 + date.getMinutes();
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isLunchTime = (market: Market, localTime: Date): boolean => {
  if (!market.tradingHours.lunch) return false;

  const currentMinutes = getMinutesFromTime(localTime);
  const lunchStart = getMinutesFromTimeString(market.tradingHours.lunch.start);
  const lunchEnd = getMinutesFromTimeString(market.tradingHours.lunch.end);

  return currentMinutes >= lunchStart && currentMinutes < lunchEnd;
};

// Helper to get time date object from HH:MM string for a specific date
const getTimeDate = (date: Date, timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};

export const getNextOpenTime = (market: Market, fromTime: Date): Date => {
  let date = new Date(fromTime);
  // Prevent infinite loop (max check 14 days)
  for (let i = 0; i < 14; i++) {
    const marketDate = convertToTimezone(date, market.timezone);
    const dateStr = formatDate(marketDate);
    const dayOfWeek = marketDate.getDay();

    // Check if it's a trading day and not a holiday
    if (market.tradingDays.includes(dayOfWeek) && !market.holidays.includes(dateStr)) {
      const openTime = getTimeDate(marketDate, market.tradingHours.open);

      // If we're looking at today
      if (i === 0) {
        // If current time is before open time, next open is today
        const marketCurrentTime = convertToTimezone(fromTime, market.timezone);
        if (marketCurrentTime.getTime() < openTime.getTime()) {
          return openTime;
        }
      } else {
        // Future day, return open time
        return openTime;
      }
    }
    // Move to next day
    date.setDate(date.getDate() + 1);
    // Reset hours to start of day to avoid skipping
    date.setHours(0, 0, 0, 0);
  }
  return date; // fallback
};

export const getMarketStatus = (market: Market, currentTime: Date): MarketStatusInfo => {
  const localTime = convertToTimezone(currentTime, market.timezone);
  const isTradingDay = market.tradingDays.includes(localTime.getDay());
  const isHoliday = market.holidays.includes(formatDate(localTime));

  const currentMinutes = getMinutesFromTime(localTime);
  const openMinutes = getMinutesFromTimeString(market.tradingHours.open);
  const closeMinutes = getMinutesFromTimeString(market.tradingHours.close);


  const closeDate = getTimeDate(localTime, market.tradingHours.close);

  // Default values
  let nextOpen = getNextOpenTime(market, currentTime);

  if (!isTradingDay || isHoliday) {
    return {
      status: 'closed',
      localTime,
      isTradingDay: false,
      isHoliday: true,
      nextOpen,
    };
  }

  const isCurrentlyLunch = isLunchTime(market, localTime);

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    if (isCurrentlyLunch) {
      // Find lunch end time
      let lunchEnd: Date | undefined;
      if (market.tradingHours.lunch) {
        lunchEnd = getTimeDate(localTime, market.tradingHours.lunch.end);
      }
      return {
        status: 'lunch',
        localTime,
        timeUntilClose: closeMinutes - currentMinutes,
        isTradingDay: true,
        isHoliday: false,
        nextOpen: lunchEnd, // Technically next "trading" open is after lunch
        nextClose: closeDate,
      };
    }

    const timeUntilClose = closeMinutes - currentMinutes;
    if (timeUntilClose <= 30) {
      return {
        status: 'closing_soon',
        localTime,
        timeUntilClose,
        isTradingDay: true,
        isHoliday: false,
        nextClose: closeDate,
        nextOpen: getNextOpenTime(market, new Date(currentTime.getTime() + 24 * 60 * 60 * 1000)) // Next day open
      };
    }

    return {
      status: 'open',
      localTime,
      timeUntilClose,
      isTradingDay: true,
      isHoliday: false,
      nextClose: closeDate,
      nextOpen: getNextOpenTime(market, new Date(currentTime.getTime() + 24 * 60 * 60 * 1000)) // Next day open
    };
  }

  // Market is closed today (before open or after close)
  return {
    status: 'closed',
    localTime,
    // timeUntilOpen is legacy, removed or ignored in favor of component logic
    isTradingDay: true,
    isHoliday: false,
    nextOpen, // Calculated correctly above by getNextOpenTime
  };
};

export const formatTimeRemaining = (minutes: number): string => {
  if (minutes < 0) minutes = 0;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

export const formatLocalTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};
