export interface StatMetric {
    id: string;
    label: string;
    value: string;
    trend: number; // percentage
    trendDirection: 'up' | 'down' | 'flat';
}

export interface ChartDataPoint {
    date: string;
    views: number;
    subscribers: number;
}

export interface DashboardInsight {
    id: string;
    type: 'success' | 'alert' | 'info';
    title: string;
    description: string;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getDashboardStats = async (range: '7d' | '28d'): Promise<StatMetric[]> => {
    await delay(800);
    const multiplier = range === '28d' ? 4 : 1;

    return [
        { id: 'views', label: 'Total Views', value: (12500 * multiplier).toLocaleString(), trend: 12.5, trendDirection: 'up' },
        { id: 'subs', label: 'New Subscribers', value: (450 * multiplier).toLocaleString(), trend: 5.2, trendDirection: 'up' },
        { id: 'watchtime', label: 'Watch Time (hrs)', value: (890 * multiplier).toLocaleString(), trend: -2.1, trendDirection: 'down' },
        { id: 'ctr', label: 'Impressions CTR', value: '5.8%', trend: 0.1, trendDirection: 'flat' },
    ];
};

export const getPerformanceData = async (range: '7d' | '28d'): Promise<ChartDataPoint[]> => {
    await delay(1000);
    const days = range === '7d' ? 7 : 28;
    const data: ChartDataPoint[] = [];

    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i));
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            views: Math.floor(Math.random() * 5000) + 1000,
            subscribers: Math.floor(Math.random() * 100) + 10,
        });
    }
    return data;
};

export const getDashboardInsights = async (): Promise<DashboardInsight[]> => {
    await delay(600);
    return [
        {
            id: '1',
            type: 'info',
            title: 'Upload Schedule Optimization',
            description: 'Your channel performs best when you upload between 6–8 PM on Tuesdays.'
        },
        {
            id: '2',
            type: 'alert',
            title: 'CTR Drop Detected',
            description: 'Recent video "AI Tools Review" has a 3.2% CTR, lower than your average of 5.8%. Consider A/B testing the thumbnail.'
        }
    ];
};
