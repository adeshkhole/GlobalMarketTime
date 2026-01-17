import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { CurrencyConverter } from '../tools/CurrencyConverter';

export const ToolsSection: React.FC = () => {
    return (
        <section id="tools" className="py-16 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                        <Wrench className="h-4 w-4 mr-2" />
                        Trading Tools
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Financial Utilities
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Practical tools to help you manage your global trading workflow efficiently.
                    </p>
                </motion.div>

                <div className="max-w-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <CurrencyConverter />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
