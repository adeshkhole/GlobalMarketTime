import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ExternalLink,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram
} from 'lucide-react';
import { useLanguageContext } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguageContext();

  const newsLinks = {
    india: [
      { name: 'Moneycontrol', url: 'https://www.moneycontrol.com', icon: '💰' },
      { name: 'Economic Times', url: 'https://economictimes.indiatimes.com', icon: '📰' },
      { name: 'NDTV Profit', url: 'https://www.ndtv.com/business', icon: '📺' },
      { name: 'Livemint', url: 'https://www.livemint.com', icon: '🌿' },
    ],
    global: [
      { name: 'Bloomberg', url: 'https://www.bloomberg.com', icon: '📊' },
      { name: 'Reuters', url: 'https://www.reuters.com', icon: '🌍' },
      { name: 'CNBC', url: 'https://www.cnbc.com', icon: '📈' },
      { name: 'MarketWatch', url: 'https://www.marketwatch.com', icon: '⌚' },
      { name: 'Investing.com', url: 'https://www.investing.com', icon: '💹' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-muted/30 border-t border-border/40 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div 
              className="flex items-center space-x-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-lg font-bold text-foreground">Global Market Time</h3>
                <p className="text-xs text-muted-foreground">Real-time market insights</p>
              </div>
            </motion.div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with live market status, opening/closing times, and trading opportunities across global exchanges.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-accent transition-colors group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Indian News Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
              🇮🇳 Indian News Sources
            </h4>
            <ul className="space-y-2">
              {newsLinks.india.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Global News Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
              🌍 Global News Sources
            </h4>
            <ul className="space-y-2">
              {newsLinks.global.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources & Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Data Sources
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  • National Stock Exchange (NSE)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  • Bombay Stock Exchange (BSE)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  • Alpha Vantage API
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  • Yahoo Finance
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-foreground mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              {t('footer.disclaimer') || 'Disclaimer: This tool is for informational purposes only. Trading involves risk.'}
            </p>
            
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Global Trading Dashboard. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
