import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TrendRadar } from '../../components/keywords/TrendRadar';
import { delay } from '../../services/mock/mockAnalytics';
import { Skeleton } from '../../components/ui/Skeleton';

interface KeywordData {
    term: string;
    volume: string;
    competition: 'Low' | 'Medium' | 'High';
    trend: 'up' | 'down' | 'flat';
}

export function Keywords() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<KeywordData[]>([]);

    const handleSearch = async () => {
        if (!searchTerm) return;
        setIsLoading(true);
        await delay(1200);

        // Mock results
        setResults([
            { term: searchTerm + ' tutorial', volume: '12K', competition: 'Medium', trend: 'up' },
            { term: 'best ' + searchTerm, volume: '8.5K', competition: 'High', trend: 'up' },
            { term: 'how to ' + searchTerm, volume: '45K', competition: 'High', trend: 'flat' },
            { term: searchTerm + ' review', volume: '5K', competition: 'Low', trend: 'down' },
            { term: searchTerm + ' 2026', volume: '22K', competition: 'Medium', trend: 'up' },
        ]);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Keyword Research</h1>
                <p className="text-muted-foreground">Discover high-volume, low-competition topics to target.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Search & Table Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Topic Search</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Enter a topic (e.g. 'coding', 'fitness')"
                                        className="pl-9"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <Button onClick={handleSearch} disabled={isLoading}>Search</Button>
                            </div>

                            <div className="border rounded-md overflow-hidden">
                                <div className="bg-muted/50 p-3 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                                    <div className="col-span-6">Keyword</div>
                                    <div className="col-span-2 text-center">Volume</div>
                                    <div className="col-span-2 text-center">Comp</div>
                                    <div className="col-span-2 text-center">Trend</div>
                                </div>

                                {isLoading ? (
                                    Array(5).fill(0).map((_, i) => (
                                        <div key={i} className="p-3 grid grid-cols-12 gap-4 border-t border-border/50 items-center">
                                            <div className="col-span-6"><Skeleton className="h-4 w-32" /></div>
                                            <div className="col-span-2"><Skeleton className="h-4 w-full" /></div>
                                        </div>
                                    ))
                                ) : results.length > 0 ? (
                                    results.map((item, i) => (
                                        <div key={i} className="p-3 grid grid-cols-12 gap-4 border-t border-border/50 items-center hover:bg-muted/30 transition-colors text-sm">
                                            <div className="col-span-6 font-medium">{item.term}</div>
                                            <div className="col-span-2 text-center text-muted-foreground">{item.volume}</div>
                                            <div className="col-span-2 text-center">
                                                <Badge variant={item.competition === 'Low' ? 'success' : item.competition === 'High' ? 'destructive' : 'secondary'} className="text-[10px] h-5 px-1.5 font-normal">
                                                    {item.competition}
                                                </Badge>
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                {item.trend === 'up' && <TrendingUp size={14} className="text-green-500" />}
                                                {item.trend === 'down' && <TrendingDown size={14} className="text-destructive" />}
                                                {item.trend === 'flat' && <Minus size={14} className="text-muted-foreground" />}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-muted-foreground text-sm">
                                        Enter a topic to see keyword data.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Radar Chart Section */}
                <div className="lg:col-span-1">
                    <TrendRadar />
                </div>
            </div>
        </div>
    );
}
