import React from 'react';
import { cn } from '../../utils/cn';

interface SeoScoreProps {
    score: number; // 0-100
    size?: 'sm' | 'md' | 'lg';
}

export function SeoScore({ score, size = 'md' }: SeoScoreProps) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = (s: number) => {
        if (s >= 80) return "text-green-500";
        if (s >= 60) return "text-yellow-500";
        return "text-destructive";
    };

    const sizeClasses = {
        sm: "h-20 w-20 text-xl",
        md: "h-32 w-32 text-3xl",
        lg: "h-48 w-48 text-5xl"
    };

    return (
        <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
            <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-muted stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                />
                <circle
                    className={cn("stroke-current transition-all duration-1000 ease-out", getColor(score))}
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("font-bold", getColor(score))}>{score}</span>
                {size !== 'sm' && <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">SEO</span>}
            </div>
        </div>
    );
}
