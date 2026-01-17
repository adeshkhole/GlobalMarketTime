import React, { useState, useEffect } from 'react';

interface LiveClockProps {
    timezone: string;
    className?: string;
}

export const LiveClock: React.FC<LiveClockProps> = ({ timezone, className }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Initial set
        setTime(new Date());

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time for the specific timezone
    const formattedTime = time.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    return (
        <span className={`tabular-nums ${className || ''}`}>
            {formattedTime}
        </span>
    );
};
