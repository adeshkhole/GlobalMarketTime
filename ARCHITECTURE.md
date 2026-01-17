# Global Trading Dashboard - Architecture Document

## Project Overview
A professional, real-time trading dashboard website built for traders to track global stock market timings, status, and movements. The application provides live market data with auto-refresh capabilities, multi-language support, dark mode, and an intuitive user interface designed specifically for the trading community.

## Tech Stack

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS 3.4** for utility-first styling
- **shadcn/ui** for pre-built, accessible components

### State Management
- **React Context API** for theme and language state
- **React Hooks** (useState, useEffect, useContext) for local state
- **Custom hooks** for market data and timers

### Data & APIs
- **Alpha Vantage API** for real-time market data (free tier: 25 requests/day)
- **Market Status Calculation** using client-side JavaScript for real-time updates
- **Local Storage** for user preferences (theme, language)

### Animations & UI Effects
- **Framer Motion** for smooth animations and transitions
- **CSS Animations** for loading states and micro-interactions
- **Intersection Observer** for scroll-triggered animations

## Project Structure

```
app/
├── public/
│   ├── images/           # Static images and icons
│   └── locales/          # Translation files
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── layout/      # Header, Footer, Layout
│   │   ├── markets/     # Market cards, status indicators
│   │   ├── features/    # Feature sections
│   │   └── common/      # Shared components
│   ├── hooks/
│   │   ├── useMarketStatus.ts    # Market status logic
│   │   ├── useCountdown.ts       # Countdown timers
│   │   ├── useTheme.ts           # Dark mode toggle
│   │   └── useLanguage.ts        # Language switching
│   ├── contexts/
│   │   ├── ThemeContext.tsx      # Theme provider
│   │   └── LanguageContext.tsx   # Language provider
│   ├── utils/
│   │   ├── marketData.ts         # Market data calculations
│   │   ├── dateTime.ts           # Timezone and formatting
│   │   └── translations.ts       # Translation utilities
│   ├── types/
│   │   ├── market.ts             # Market data types
│   │   └── index.ts              # Type exports
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── App.tsx                  # Main application
│   └── main.tsx                 # Entry point
├── dist/                # Build output
└── README.md           # Setup instructions
```

## Core Features Architecture

### 1. Real-Time Market Status
- **Client-side calculation** using system time and market hours
- **Live status updates** every second for all global markets
- **Market categories**: Asia-Pacific, Europe, Americas
- **Status indicators**: Open (Green), Closed (Red), Opening Soon (Orange)
- **Countdown timers** showing time until open/close

### 2. Market Data Structure
```typescript
interface Market {
  id: string;
  name: string;
  country: string;
  flag: string;
  index: string;
  timezone: string;
  tradingHours: {
    open: string;    // HH:MM format in local timezone
    close: string;   // HH:MM format in local timezone
    lunch?: {
      start: string;
      end: string;
    };
  };
  tradingDays: number[]; // 0=Sunday, 1=Monday, etc.
  holidays: string[];    // YYYY-MM-DD format
  dataSource: string;
}
```

### 3. Market Status Calculation Logic
```typescript
// Market status determination
const getMarketStatus = (market: Market, currentTime: Date): MarketStatus => {
  const localTime = convertToTimezone(currentTime, market.timezone);
  const isTradingDay = market.tradingDays.includes(localTime.getDay());
  const isHoliday = market.holidays.includes(formatDate(localTime));
  
  if (!isTradingDay || isHoliday) return 'closed';
  
  const currentMinutes = getMinutesFromTime(localTime);
  const openMinutes = getMinutesFromTimeString(market.tradingHours.open);
  const closeMinutes = getMinutesFromTimeString(market.tradingHours.close);
  
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return isLunchTime(market, localTime) ? 'lunch' : 'open';
  }
  
  const minutesToOpen = openMinutes - currentMinutes;
  if (minutesToOpen > 0 && minutesToOpen <= 60) return 'opening_soon';
  
  return 'closed';
};
```

### 4. Dark Mode Implementation
- **CSS Variables** for theme colors (--background, --foreground, etc.)
- **LocalStorage persistence** for user preference
- **Smooth transitions** using CSS transitions
- **System preference detection** on initial load

### 5. Multi-Language Support
- **JSON-based translations** for English, Hindi, and Marathi
- **React Context** for language state management
- **Dynamic text replacement** without page reload
- **Language switcher** in header with flag icons

### 6. Auto-Refresh System
- **30-second refresh interval** for market data
- **Manual refresh button** for immediate updates
- **Loading states** with animated spinners
- **Error handling** with retry mechanisms

## Market Coverage

### Asia-Pacific Markets
- **India (NSE/BSE)**: 9:15 AM - 3:30 PM IST
- **Japan (TSE)**: 5:30 AM - 11:30 AM IST
- **Hong Kong (HKEX)**: 6:45 AM - 1:30 PM IST
- **China (SSE)**: 7:00 AM - 12:30 PM IST
- **Australia (ASX)**: 5:30 AM - 11:30 AM IST
- **South Korea (KRX)**: 5:30 AM - 11:30 AM IST

### European Markets
- **Germany (Deutsche Börse)**: 12:30 PM - 2:30 AM IST
- **UK (London SE)**: 1:30 PM - 10:00 PM IST
- **France (Euronext)**: 12:30 PM - 9:00 PM IST
- **Switzerland (SIX)**: 1:30 PM - 10:00 PM IST

### American Markets
- **USA (NYSE/NASDAQ)**: 7:00 PM - 1:30 AM IST
- **Canada (TSX)**: 8:00 PM - 2:30 AM IST
- **Brazil (B3)**: 6:30 PM - 1:30 AM IST

## Data Sources
- **Alpha Vantage API**: Real-time and historical market data
- **National Stock Exchange of India (NSE)**: Official Indian market data
- **Bombay Stock Exchange (BSE)**: Official Indian market data
- **Yahoo Finance**: Market indices and news

## News Integration
Popular trading news websites linked in the dashboard:
- **India**: Moneycontrol, Economic Times, NDTV Profit
- **Global**: Bloomberg, Reuters, CNBC, MarketWatch
- **Real-time**: Livemint, Investing.com, Benzinga

## Performance Optimizations

### Rendering
- **React.memo** for component memoization
- **useMemo** for expensive calculations
- **useCallback** for function optimization
- **Virtual scrolling** for long lists (if needed)

### Data Fetching
- **Request caching** to minimize API calls
- **Background refetching** for fresh data
- **Error boundaries** for graceful failure
- **Loading skeletons** for better UX

### Animations
- **GPU-accelerated** CSS transforms
- **Reduced motion** support for accessibility
- **Lazy loading** for off-screen animations

## Browser Support
- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Progressive enhancement** for older browsers
- **Feature detection** using CSS.supports()

## Deployment
- **Static hosting** on Netlify/Vercel
- **CDN integration** for global performance
- **HTTPS enforcement** for security
- **Service Worker** for offline functionality

## Security Considerations
- **API key protection** using environment variables
- **Content Security Policy** headers
- **No sensitive data** in localStorage
- **HTTPS only** in production

## Future Enhancements
- **WebSocket integration** for real-time price updates
- **Portfolio tracking** with user accounts
- **Advanced charting** with technical indicators
- **Push notifications** for market alerts
- **Mobile app** using React Native
- **Stock screener** with filtering options
- **Economic calendar** integration
- **Market sentiment analysis**

## Development Workflow
1. **Local development**: `npm run dev`
2. **Type checking**: `npm run type-check`
3. **Linting**: `npm run lint`
4. **Building**: `npm run build`
5. **Testing**: `npm run test`
6. **Deployment**: Automated via GitHub Actions

## Environment Variables
```env
VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://www.alphavantage.co/query
```

## API Usage Limits
- **Free tier**: 25 requests per day (Alpha Vantage)
- **Rate limit**: 5 requests per minute
- **Caching strategy**: 5-minute cache for market data
- **Fallback**: Static data when API limits exceeded
