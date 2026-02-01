import React from 'react';
import { Calendar as CalendarIcon, MoreHorizontal, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';

export function Planner() {
    const today = new Date();
    const headers = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Mock Calendar Data
    const events = [
        { day: 5, title: "AI Tools Review", type: "Long", status: "Scripting" },
        { day: 8, title: "Tech News Update", type: "Short", status: "Filming" },
        { day: 12, title: "Coding Challenge", type: "Long", status: "Editing" },
        { day: 15, title: "Q&A Session", type: "Live", status: "Planned" },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Content Planner</h1>
                    <p className="text-muted-foreground">Schedule your upcoming videos and shorts.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Idea
                </Button>
            </div>

            <Card className="min-h-[600px]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>February 2026</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 border-b border-border">
                        {headers.map(h => (
                            <div key={h} className="p-4 text-center font-medium text-sm text-muted-foreground border-r last:border-r-0 border-border">
                                {h}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 auto-rows-[120px]">
                        {Array.from({ length: 35 }).map((_, i) => {
                            const dayNum = i + 1;
                            const event = events.find(e => e.day === dayNum);
                            const isCurrentMonth = i < 28; // Simplified mock logic

                            return (
                                <div key={i} className={`p-2 border-b border-r last:border-r-0 border-border relative group hover:bg-muted/10 transition-colors ${!isCurrentMonth ? 'bg-muted/5 opacity-50' : ''}`}>
                                    <span className="text-sm font-medium text-muted-foreground">{dayNum <= 28 ? dayNum : ''}</span>

                                    {event && (
                                        <div className="mt-2 p-2 rounded bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors text-xs space-y-1">
                                            <p className="font-semibold truncate">{event.title}</p>
                                            <div className="flex items-center justify-between">
                                                <Badge variant="secondary" className="text-[10px] px-1 h-4">{event.type}</Badge>
                                                <span className="text-[10px] text-muted-foreground">{event.status}</span>
                                            </div>
                                        </div>
                                    )}

                                    <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus size={16} className="text-muted-foreground hover:text-foreground" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
