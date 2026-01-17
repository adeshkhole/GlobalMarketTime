import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Flag } from 'lucide-react';

interface EconomicEvent {
    id: number;
    time: string;
    country: string;
    flag: string;
    event: string;
    impact: 'High' | 'Medium' | 'Low';
    previous: string;
    forecast: string;
}

const UPCOMING_EVENTS: EconomicEvent[] = [
    { id: 1, time: '18:30', country: 'USA', flag: '🇺🇸', event: 'Initial Jobless Claims', impact: 'High', previous: '218K', forecast: '220K' },
    { id: 2, time: '19:15', country: 'EUR', flag: '🇪🇺', event: 'ECB President Lagarde Speaks', impact: 'Medium', previous: '-', forecast: '-' },
    { id: 3, time: '20:00', country: 'USA', flag: '🇺🇸', event: 'Existing Home Sales', impact: 'Low', previous: '3.78M', forecast: '3.89M' },
    { id: 4, time: '09:00', country: 'IND', flag: '🇮🇳', event: 'RBI Monetary Policy Meeting', impact: 'High', previous: '6.50%', forecast: '6.50%' },
    { id: 5, time: '14:30', country: 'GBP', flag: '🇬🇧', event: 'Retail Sales MoM', impact: 'Medium', previous: '-3.2%', forecast: '-0.5%' },
];

export const EconomicCalendar: React.FC = () => {
    return (
        <div className="p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md shadow-xl h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Economic Calendar</h3>
                </div>
                <Bell className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>

            <div className="space-y-4">
                {UPCOMING_EVENTS.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="text-xs font-mono font-bold text-muted-foreground w-12 text-center py-1 bg-muted rounded">
                                {event.time}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">{event.flag}</span>
                                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{event.event}</span>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${event.impact === 'High' ? 'bg-red-500/10 text-red-500' :
                                            event.impact === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
                                                'bg-blue-500/10 text-blue-500'
                                        }`}>
                                        {event.impact} Impact
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end space-y-1">
                            <div className="flex space-x-3 text-[10px] font-bold text-muted-foreground">
                                <div className="flex flex-col items-end">
                                    <span>PREV</span>
                                    <span className="text-foreground">{event.previous}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span>FORECAST</span>
                                    <span className="text-foreground">{event.forecast}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/10 flex items-center justify-between">
                <p className="text-xs text-muted-foreground flex items-center">
                    <Flag className="h-3 w-3 mr-1" />
                    Market times in IST (UTC+5:30)
                </p>
                <button className="text-xs font-bold text-primary hover:underline">View All Events</button>
            </div>
        </div>
    );
};
