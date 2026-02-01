import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { fetchChannelStats } from '../../services/api/youtube';
import { StatCard } from '../../components/dashboard/StatCard';
import { PerformanceChart } from '../../components/dashboard/PerformanceChart';
import { ActionAlerts } from '../../components/dashboard/ActionAlerts';
import { InsightCard } from '../../components/insights/InsightCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { Lightbulb, TrendingUp, AlertCircle, Info, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Mock chart data for Alpha (Analytics API requires complex auth)
const MOCK_CHART_DATA = [
    { date: 'Mon', name: 'Mon', views: 4000, subscribers: 120 },
    { date: 'Tue', name: 'Tue', views: 3000, subscribers: 132 },
    { date: 'Wed', name: 'Wed', views: 5000, subscribers: 101 },
    { date: 'Thu', name: 'Thu', views: 2780, subscribers: 134 },
    { date: 'Fri', name: 'Fri', views: 1890, subscribers: 90 },
    { date: 'Sat', name: 'Sat', views: 2390, subscribers: 230 },
    { date: 'Sun', name: 'Sun', views: 3490, subscribers: 210 },
];

export function Dashboard() {
    const { accessToken, clearSession } = useAuthStore();

    const { data: channel, isLoading, error } = useQuery({
        queryKey: ['channelStats'],
        queryFn: () => fetchChannelStats(accessToken!),
        enabled: !!accessToken,
        retry: false
    });

    // Handle token expiration
    useEffect(() => {
        if (error?.message === 'Unauthorized') {
            clearSession();
        }
    }, [error, clearSession]);

    if (error && error.message !== 'Unauthorized') {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-destructive mb-2">Failed to load channel data</h2>
                <p className="text-muted-foreground mb-4">{error.message}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header / Intro */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Channel Overview</h1>
                <p className="text-muted-foreground">
                    Performance for <span className="font-semibold text-foreground">{isLoading ? 'Loading...' : channel?.title}</span>
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    Array(4).fill(0).map((_, i) => <StatCard key={i} label="" value="" trend={0} trendDirection="flat" isLoading={true} />)
                ) : (
                    <>
                        <StatCard
                            label="Total Subscribers"
                            value={parseInt(channel?.subscriberCount || '0').toLocaleString()}
                            trend={0} // API doesn't give trend without Analytics API
                            trendDirection="flat"
                        />
                        <StatCard
                            label="Total Views"
                            value={parseInt(channel?.viewCount || '0').toLocaleString()}
                            trend={0}
                            trendDirection="up"
                        />
                        <StatCard
                            label="Total Videos"
                            value={parseInt(channel?.videoCount || '0').toLocaleString()}
                            trend={0}
                            trendDirection="flat"
                        />
                        <StatCard
                            label="Avg Views"
                            value={channel ? Math.round(parseInt(channel.viewCount) / parseInt(channel.videoCount)).toLocaleString() : '0'}
                            trend={0}
                            trendDirection="flat"
                        />
                    </>
                )}
            </div>

            {/* Main Content Grid: Chart + Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <PerformanceChart data={MOCK_CHART_DATA} isLoading={false} />
                </div>
                <div className="lg:col-span-1">
                    <ActionAlerts />
                </div>
            </div>

            {/* AI Insights Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Lightbulb className="text-yellow-500" size={24} />
                    AI Strategic Insights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InsightCard
                        icon={TrendingUp}
                        title="Growth Opportunity"
                        description="Your channel is growing! Try publishing your next video on Tuesday at 10AM."
                        variant="success"
                    />
                    <InsightCard
                        icon={Info}
                        title="Content Tip"
                        description="Viewers are looking for more content in your niche. Consider doing a 'How-to' series."
                        variant="info"
                    />
                </div>
            </div>
        </div>
    );
}
