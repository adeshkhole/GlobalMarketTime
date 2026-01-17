# Global Market Time 🌍📈

एक professional, real-time trading dashboard website जी traders ला global stock markets ची माहिती देते. ही वेबसाइट specially भारतीय traders साठी design केली आहे जे India (NSE/BSE), USA (NYSE/NASDAQ), Europe आणि Asia मधील सर्व major markets track करू शकतात.

## ✨ Features

### 🕐 Real-Time Market Status
- **Live Seconds Ticking**: Continuous 1-second updates for local time
- **Precise Countdown**: Days, Hours, Minutes, Seconds until Open/Close
- **Live Status**: Open (Green), Closed (Red), Opening Soon (Orange), Lunch (Yellow)
- Market status: Open (Green), Closed (Red), Opening Soon (Orange)

### 🌏 Global Market Coverage
- **Asia-Pacific**: India, Japan, Hong Kong, China, Australia, South Korea
- **Europe**: Germany, UK, France, Switzerland, Spain
- **Americas**: USA, Canada, Brazil
- All timings displayed in Indian Standard Time (IST)

### 🎨 Modern UI/UX
- Professional dark/light mode toggle
- Smooth animations and transitions
- Responsive design for all devices
- Loading skeletons for better UX

### 🌐 Multi-Language Support
- **English** (Default)
- **हिंदी** (Hindi)
- **मराठी** (Marathi)
- Quick language switcher in header

### 📰 Trading News Integration
Popular trading news websites चे direct links:
- **India**: Moneycontrol, Economic Times, NDTV Profit, Livemint
- **Global**: Bloomberg, Reuters, CNBC, MarketWatch, Investing.com

### 📊 Data Sources
- **Alpha Vantage API** for real-time market data
- **NSE & BSE** official data sources
- **Yahoo Finance** for market indices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Alpha Vantage API key (free)

### Installation Steps

1. **Project Initialize करा**
```bash
# Project directory मध्ये जा
cd /mnt/okcomputer/output/app

# Dependencies install करा
npm install
```

2. **Environment Variables Set करा**
```bash
# .env file create करा
touch .env

# खालील lines add करा:
VITE_ALPHA_VANTAGE_API_KEY=YOUR_API_KEY_HERE
VITE_API_BASE_URL=https://www.alphavantage.co/query
```

3. **Alpha Vantage API Key कसा मिळवायचा?**
   - [Alpha Vantage Website](https://www.alphavantage.co/) वर जा
   - "Get Free API Key" वर click करा
   - Sign up करा आणि free API key मिळवा
   - Free tier मध्ये दररोज 25 requests मिळतात

4. **Development Server Start करा**
```bash
npm run dev
```

5. **Build करा (Production साठी)**
```bash
npm run build
```

## 📁 Project Structure

```
app/
├── public/
│   ├── images/           # Static images and icons
│   └── locales/          # Translation files (en.json, hi.json, mr.json)
├── src/
│   ├── components/       # React components
│   │   ├── layout/       # Header, Footer, Layout
│   │   ├── markets/      # Market cards and status
│   │   └── features/     # Feature sections
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React Context providers
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main application
│   └── main.tsx          # Entry point
├── dist/                 # Build output
└── README.md            # This file
```

## 🛠️ Available Scripts

```bash
# Development server start
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Preview production build
npm run preview
```

## 🌍 Market Timings (IST - Indian Standard Time)

### Asia-Pacific Markets
| Market | Country | Opening Time | Closing Time |
|--------|---------|--------------|--------------|
| **NSE/BSE** | 🇮🇳 India | 9:15 AM | 3:30 PM |
| **TSE** | 🇯🇵 Japan | 5:30 AM | 11:30 AM |
| **HKEX** | 🇭🇰 Hong Kong | 6:45 AM | 1:30 PM |
| **SSE** | 🇨🇳 China | 7:00 AM | 12:30 PM |
| **ASX** | 🇦🇺 Australia | 5:30 AM | 11:30 AM |
| **KRX** | 🇰🇷 South Korea | 5:30 AM | 11:30 AM |

### European Markets
| Market | Country | Opening Time | Closing Time |
|--------|---------|--------------|--------------|
| **Deutsche Börse** | 🇩🇪 Germany | 12:30 PM | 2:30 AM |
| **London SE** | 🇬🇧 UK | 1:30 PM | 10:00 PM |
| **Euronext** | 🇪🇺 Europe | 12:30 PM | 9:00 PM |
| **SIX Swiss** | 🇨🇭 Switzerland | 1:30 PM | 10:00 PM |

### American Markets
| Market | Country | Opening Time | Closing Time |
|--------|---------|--------------|--------------|
| **NYSE/NASDAQ** | 🇺🇸 USA | 7:00 PM | 1:30 AM |
| **TSX** | 🇨🇦 Canada | 8:00 PM | 2:30 AM |
| **B3** | 🇧🇷 Brazil | 6:30 PM | 1:30 AM |

## 🎨 Features Details

### Dark Mode Toggle
- Header मध्ये dark/light mode button
- Smooth CSS transitions
- LocalStorage मध्ये preference save होते
- System preference auto-detect

### Language Switcher
- Header मध्ये dropdown menu
- English, Hindi, Marathi languages
- Instant translation without page reload
- All text content translates होतो

### Live Clock & Updates
- **Internal 1-Second Tick**: `LiveClock` component handles local time
- **Smart Polling**: Data refreshes every 60 seconds to optimize performance
- **No Manual Refresh**: UI updates automatically without user intervention

### Market Status Indicators
- 🟢 **Open**: Market सुरू आहे
- 🔴 **Closed**: Market बंद आहे
- 🟠 **Opening Soon**: 1 तास आधीपासून दर्शवतो
- 🟡 **Lunch Break**: काही Asian markets साठी

## 📊 API Information

### Free Tier Limits (Alpha Vantage)
- **Daily Limit**: 25 requests per day
- **Rate Limit**: 5 requests per minute
- **Real-time Data**: 15-minute delayed for US markets
- **Global Coverage**: 200,000+ tickers across 20+ exchanges

### API Endpoints Used
- `GLOBAL_QUOTE`: Real-time stock quotes
- `TIME_SERIES_DAILY`: Daily historical data
- `MARKET_STATUS`: Market open/closed status

## 🌐 Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📱 Responsive Design
- **Desktop**: Full layout with sidebar
- **Tablet**: Adjusted grid layout
- **Mobile**: Single column, collapsible menu

## 🔧 Customization

### New Markets Add करणे
`src/utils/marketData.ts` file मध्ये new market object add करा:

```typescript
{
  id: 'new_market',
  name: 'New Stock Exchange',
  country: 'Country Name',
  flag: '🇮🇳',
  index: 'INDEX_NAME',
  timezone: 'Asia/Kolkata',
  tradingHours: {
    open: '09:15',
    close: '15:30'
  },
  tradingDays: [1, 2, 3, 4, 5], // Monday to Friday
  holidays: ['2026-01-26', '2026-08-15'],
  dataSource: 'Source Name'
}
```

### Translations Add/Edit करणे
`public/locales/` folder मध्ये respective JSON file edit करा:

```json
{
  "header.title": "तुमचा मराठी टेक्स्ट येथे",
  "markets.open": "खुले",
  "markets.closed": "बंद"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - .env file मध्ये correct API key आहे का check करा
   - Key format: `VITE_ALPHA_VANTAGE_API_KEY=your_key`

2. **Build Error**
   - `npm run type-check` करा
   - Type errors solve करा
   - `npm run build` पुन्हा चालवा

3. **Market Data Not Loading**
   - API limit exceed झाली का check करा
   - Network connection check करा
   - Console मध्ये errors check करा

4. **Language Not Switching**
   - JSON files correct format मध्ये आहेत का check करा
   - Browser localStorage clear करा

## 📄 License
This project is open source and available under the MIT License.

## 🤝 Contributing
Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support
कोणत्याही issues किंवा questions साठी:
- GitHub Issues create करा
- Email पाठवा: support@globalmarkettime.com

---

**Made with ❤️ for the Indian Trading Community**

**Data Source**: Alpha Vantage | NSE | BSE | Yahoo Finance

**Disclaimer**: This tool is for informational purposes only. Trading involves risk. Please consult with a financial advisor before making investment decisions.
"# GlobalMarketTime" 
