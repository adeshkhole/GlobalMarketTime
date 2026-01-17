import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useLanguageContext } from '@/contexts/LanguageContext';
import type { Language } from '@/utils/translations';

interface HeaderProps {
  lastUpdated: Date;
  onRefresh?: () => void;
  loading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh, loading }) => {
  const { theme, toggleTheme } = useThemeContext();
  const { language, setLanguage, languages } = useLanguageContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLanguageDropdownOpen(false);
  };

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center bg-white/5 border border-primary/20">
                <img
                  src="GlobalMarketTime.png"
                  alt="Global Market Time"
                  className="w-full h-full object-contain"
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full -z-10"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight text-foreground leading-none">Global Market Time</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1.5 opacity-80 hidden sm:block">
                Real-time market status for traders
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="#markets" className="text-sm font-medium hover:text-primary transition-colors">Markets</a>
              <a href="#news" className="text-sm font-medium hover:text-primary transition-colors">News</a>
              <a href="#tools" className="text-sm font-medium hover:text-primary transition-colors">Tools</a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="flex items-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden lg:inline">
                    {languages.find(lang => lang.code === language)?.name}
                  </span>
                  <motion.div
                    animate={{ rotate: languageDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </Button>

                <AnimatePresence>
                  {languageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-popover border border-border rounded-md shadow-lg z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-accent transition-colors ${language === lang.code ? 'bg-accent text-accent-foreground' : 'text-foreground'
                            }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Refresh Button */}
              {onRefresh && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRefresh}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </motion.div>
              )}

              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="relative"
                >
                  <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border/40"
            >
              <div className="flex flex-col space-y-4">
                <nav className="flex flex-col space-y-3">
                  <a href="#markets" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors px-2 py-1">Markets</a>
                  <a href="#news" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors px-2 py-1">News</a>
                  <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors px-2 py-1">Tools</a>
                </nav>

                <div className="h-px bg-border/40 w-full" />

                {/* Language Selector Mobile */}
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Language:</span>
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-1 rounded text-sm transition-colors ${language === lang.code
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                          }`}
                      >
                        {lang.flag} {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Toggle Mobile */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Moon className="h-4 w-4" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun className="h-4 w-4" />
                        <span>Light Mode</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Last Updated Mobile */}
                <div className="text-xs text-muted-foreground">
                  Last updated: {formatLastUpdated(lastUpdated)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
