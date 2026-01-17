import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, TrendingUp, Globe, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { marketService, type NewsArticle } from '@/services/marketService';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await marketService.getNewsSentiment();
        if (data.length === 0) {
          setNews([]);
        } else {
          setNews(data);
        }
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getSentimentColor = (score: number) => {
    if (score > 0.15) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (score < -0.15) return 'text-red-500 bg-red-500/10 border-red-500/20';
    return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
  };

  const formatDate = (dateStr: string) => {
    // Format: 20240117T120000 -> 17 Jan, 12:00
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const hour = dateStr.slice(9, 11);
    const minute = dateStr.slice(11, 13);
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) + ', ' +
      date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="news" className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Newspaper className="h-4 w-4 mr-2" />
            Live Market Intelligence
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Global News & Sentiment
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time AI-powered news analysis and sentiment tracking for global financial markets.
          </p>
        </motion.div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-[400px]">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <motion.div
                key={item.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.banner_image || 'https://images.unsplash.com/photo-1611974715853-2b8ef9a3d136?q=80&w=2070&auto=format&fit=crop'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className={`backdrop-blur-md font-bold ${getSentimentColor(item.overall_sentiment_score)}`}>
                        {item.overall_sentiment_label}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-[10px] uppercase tracking-tighter">
                        {item.source}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="flex-grow">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(item.time_published)}</span>
                    </div>
                    <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {item.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>AI Sentiment: {(item.overall_sentiment_score * 100).toFixed(0)}%</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="group/btn">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          Read More
                          <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-background/50 rounded-2xl border border-dashed border-border group">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20 group-hover:opacity-40 transition-opacity" />
            <h3 className="text-xl font-semibold mb-2">News feed is currently quiet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              This could be due to the Alpha Vantage free tier limit (25 requests per day) being reached.
              <br /><br />
              <span className="text-xs italic bg-primary/5 px-3 py-1 rounded-full">Pro Tip: Check back tomorrow or refresh in a few hours!</span>
            </p>
          </div>
        )}

        {/* Bottom Source Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl bg-primary/5 border border-primary/10"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Globe className="h-10 w-10 text-primary opacity-50" />
            <div>
              <h4 className="font-bold">Alpha Intelligence™</h4>
              <p className="text-sm text-muted-foreground italic">Powered by official Alpha Vantage News & Sentiment API</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="text-center px-4">
              <span className="block text-2xl font-bold text-primary">20+</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Global Exchanges</span>
            </div>
            <div className="border-r border-primary/10" />
            <div className="text-center px-4">
              <span className="block text-2xl font-bold text-primary">500+</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">News Outlets</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
