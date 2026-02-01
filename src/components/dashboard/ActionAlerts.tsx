import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export function ActionAlerts() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg">Action Needed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="text-destructive shrink-0 mt-0.5" size={18} />
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-destructive">Low CTR on Latest Video</p>
                        <p className="text-xs text-muted-foreground">"Tech Review 2024" is performing 25% below average.</p>
                        <Button variant="outline" size="sm" className="h-7 text-xs mt-2 bg-background hover:bg-destructive/10 border-destructive/30 hover:text-destructive">
                            Fix Thumbnail
                        </Button>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <TrendingUp className="text-blue-500 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-500">Rising Trend: "AI Agents"</p>
                        <p className="text-xs text-muted-foreground">Volume up 200% in your niche.</p>
                        <Button variant="outline" size="sm" className="h-7 text-xs mt-2 bg-background hover:bg-blue-500/10 border-blue-500/30 hover:text-blue-500">
                            Create Video
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
