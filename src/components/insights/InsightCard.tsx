import React from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface InsightCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    variant?: 'default' | 'alert' | 'success' | 'info';
    className?: string;
}

export function InsightCard({ icon: Icon, title, description, variant = 'default', className }: InsightCardProps) {
    return (
        <Card className={cn("relative overflow-hidden border-l-4 transition-all hover:shadow-md", {
            "border-l-primary": variant === 'default',
            "border-l-destructive": variant === 'alert',
            "border-l-green-500": variant === 'success',
            "border-l-blue-500": variant === 'info',
            "bg-primary/5": variant === 'default',
            "bg-destructive/5": variant === 'alert',
            "bg-green-500/5": variant === 'success',
            "bg-blue-500/5": variant === 'info'
        }, className)}>
            <CardContent className="p-4 flex gap-4 items-start">
                <div className={cn("p-2 rounded-full", {
                    "bg-primary/10 text-primary": variant === 'default',
                    "bg-destructive/10 text-destructive": variant === 'alert',
                    "bg-green-500/10 text-green-500": variant === 'success',
                    "bg-blue-500/10 text-blue-500": variant === 'info'
                })}>
                    <Icon size={20} />
                </div>
                <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-sm leading-none">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
            </CardContent>
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl pointer-events-none" />
        </Card>
    );
}
