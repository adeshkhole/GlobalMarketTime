import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, TrendingUp, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const NewsSection: React.FC = () => {
  const newsSources = {
    india: [
      { 
        name: 'Moneycontrol', 
        url: 'https://www.moneycontrol.com', 
        description: 'Latest stock market news and analysis',
        icon: '💰',
        color: 'from-blue-500 to-blue-600'
      },
      { 
        name: 'Economic Times', 
        url: 'https://economictimes.indiatimes.com', 
        description: 'Business news and market updates',
        icon: '📰',
        color: 'from-orange-500 to-orange-600'
      },
      { 
        name: 'NDTV Profit', 
        url: 'https://www.ndtv.com/business', 
        description: 'Financial news and expert opinions',
        icon: '📺',
        color: 'from-red-500 to-red-600'
      },
      { 
        name: 'Livemint', 
        url: 'https://www.livemint.com', 
        description: 'Real-time market coverage',
        icon: '🌿',
        color: 'from-green-500 to-green-600'
      },
    ],
    global: [
      { 
        name: 'Bloomberg', 
        url: 'https://www.bloomberg.com', 
        description: 'Global financial news leader',
        icon: '📊',
        color: 'from-purple-500 to-purple-600'
      },
      { 
        name: 'Reuters', 
        url: 'https://www.reuters.com', 
        description: 'International news agency',
        icon: '🌍',
        color: 'from-indigo-500 to-indigo-600'
      },
      { 
        name: 'CNBC', 
        url: 'https://www.cnbc.com', 
        description: 'Business news and analysis',
        icon: '📈',
        color: 'from-cyan-500 to-cyan-600'
      },
      { 
        name: 'MarketWatch', 
        url: 'https://www.marketwatch.com', 
        description: 'Markets data and insights',
        icon: '⌚',
        color: 'from-teal-500 to-teal-600'
      },
      { 
        name: 'Investing.com', 
        url: 'https://www.investing.com', 
        description: 'Comprehensive market tools',
        icon: '💹',
        color: 'from-emerald-500 to-emerald-600'
      },
    ],
  };

  return (
    <section id="news" className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Newspaper className="h-4 w-4 mr-2" />
            Latest Updates
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trading News
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest market news and analysis from trusted sources around the world.
          </p>
        </motion.div>

        {/* News Sources Grid */}
        <div className="space-y-12">
          {/* Indian News Sources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h3 className="text-xl font-bold text-foreground">Indian News Sources</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsSources.india.map((source, index) => (
                <motion.a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 bg-background/50 backdrop-blur-sm">
                    <div className={`h-2 bg-gradient-to-r ${source.color}`} />
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{source.icon}</span>
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {source.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {source.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full group/btn"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Global News Sources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="h-6 w-6 text-blue-500" />
              <h3 className="text-xl font-bold text-foreground">Global News Sources</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {newsSources.global.map((source, index) => (
                <motion.a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 bg-background/50 backdrop-blur-sm">
                    <div className={`h-2 bg-gradient-to-r ${source.color}`} />
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{source.icon}</span>
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {source.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {source.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full group/btn"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to add more news sources? Contact us with your suggestions.
          </p>
          <Button variant="outline">
            Suggest News Source
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
