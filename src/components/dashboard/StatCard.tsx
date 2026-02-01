import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { cn } from '../../utils/cn';

interface StatCardProps {
    label: string;
    value: string;
    trend: number;
    trendDirection: 'up' | 'down' | 'flat';
    isLoading?: boolean;
}

export function StatCard({ label, value, trend, trendDirection, isLoading }: StatCardProps) {
    if (isLoading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-20 mb-2" />
                    <Skeleton className="h-3 w-12" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex items-center text-xs mt-1">
                    {trendDirection === 'up' && <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />}
                    {trendDirection === 'down' && <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />}
                    {trendDirection === 'flat' && <Minus className="mr-1 h-3 w-3 text-muted-foreground" />}

                    <span className={cn(
                        "font-medium",
                        trendDirection === 'up' && "text-green-500",
                        trendDirection === 'down' && "text-destructive",
                        trendDirection === 'flat' && "text-muted-foreground",
                    )}>
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-muted-foreground ml-1">from last period</span>
                </div>
            </CardContent>
        </Card>
    );
}
