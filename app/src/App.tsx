import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarketsSection } from '@/components/sections/MarketsSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { useMarketStatus } from '@/hooks/useMarketStatus';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function AppContent() {
  const { marketData, loading, error, refresh, lastUpdated } = useMarketStatus(30000);
  const marketsRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToMarkets = useCallback(() => {
    marketsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show error toast on error
  useEffect(() => {
    if (error) {
      toast.error('Failed to load market data', {
        description: 'Please check your connection and try again.',
        action: {
          label: 'Retry',
          onClick: refresh,
        },
      });
    }
  }, [error, refresh]);

  // Show success toast on refresh
  const handleRefresh = useCallback(() => {
    toast.promise(Promise.resolve(refresh()), {
      loading: 'Refreshing market data...',
      success: 'Market data updated successfully!',
      error: 'Failed to refresh data',
    });
  }, [refresh]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Header */}
      <Header 
        onRefresh={handleRefresh} 
        lastUpdated={lastUpdated}
        loading={loading}
      />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection onScrollToMarkets={scrollToMarkets} />

        {/* Markets Section */}
        <div ref={marketsRef}>
          <MarketsSection
            marketData={marketData}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
            lastUpdated={lastUpdated}
          />
        </div>

        {/* News Section */}
        <NewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <svg 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
