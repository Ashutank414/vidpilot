import React, { useState } from 'react';
import { Search, Loader2, CheckCircle, AlertTriangle, Wand2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { SeoScore } from '../../components/analyzer/SeoScore';
import { InsightCard } from '../../components/insights/InsightCard';
import { delay } from '../../services/mock/mockAnalytics';

interface AnalysisResult {
    score: number;
    title: { status: 'good' | 'warning' | 'bad', text: string };
    thumbnail: { status: 'good' | 'warning' | 'bad', text: string };
    retention: { status: 'good' | 'warning' | 'bad', text: string };
    aiSuggestion: string;
}

export function Analyzer() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleAnalyze = async () => {
        if (!url) return;
        setIsLoading(true);
        setResult(null);
        await delay(1500); // Simulate processing

        // Mock result based on random
        const score = Math.floor(Math.random() * (95 - 60) + 60);
        setResult({
            score,
            title: { status: 'good', text: 'Title length is optimal (55 chars). Keywords detected: "AI", "Growth".' },
            thumbnail: { status: 'warning', text: 'Text overlay contrast is low. Faces detected: 1.' },
            retention: { status: 'good', text: 'Predicted retention: 45% (Above Average).' },
            aiSuggestion: 'Try adding "Tutorial" to the beginning of the title to increase CTR by approx 12%.'
        });
        setIsLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Video Analyzer</h1>
                <p className="text-muted-foreground">Paste a YouTube URL to get instant AI feedback on SEO, Title, and Thumbnails.</p>
            </div>

            <Card className="p-2">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="pl-9 h-10 bg-background"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleAnalyze} disabled={isLoading || !url} className="px-8">
                        {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        Analyze
                    </Button>
                </div>
            </Card>

            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Score Card */}
                        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-card to-muted/20">
                            <SeoScore score={result.score} size="lg" />
                            <p className="mt-4 font-medium text-muted-foreground">Overall SEO Score</p>
                        </Card>

                        {/* Details Card */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Performance Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className={cn("p-2 rounded-full", result.title.status === 'good' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500")}>
                                        {result.title.status === 'good' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Title Strength</h4>
                                        <p className="text-sm text-muted-foreground">{result.title.text}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className={cn("p-2 rounded-full", result.thumbnail.status === 'good' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500")}>
                                        {result.thumbnail.status === 'good' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Thumbnail Analysis</h4>
                                        <p className="text-sm text-muted-foreground">{result.thumbnail.text}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className={cn("p-2 rounded-full", result.retention.status === 'good' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500")}>
                                        {result.retention.status === 'good' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">Retention Prediction</h4>
                                        <p className="text-sm text-muted-foreground">{result.retention.text}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <InsightCard
                        icon={Wand2}
                        title="AI Improvement Suggestion"
                        description={result.aiSuggestion}
                        variant="default" // Default is indigo glow
                    />
                </div>
            )}
        </div>
    );
}
