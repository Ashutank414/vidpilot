import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
import { Users } from 'lucide-react';

interface Competitor {
    id: string;
    name: string;
    subscribers: string;
    recentUploads: number;
    topVideo: string;
}

export function Competitors() {
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [newCompetitor, setNewCompetitor] = useState('');

    const handleAdd = () => {
        if (!newCompetitor.trim()) return;
        const mockCompetitor: Competitor = {
            id: Date.now().toString(),
            name: newCompetitor,
            subscribers: (Math.random() * 500).toFixed(1) + 'K',
            recentUploads: Math.floor(Math.random() * 5),
            topVideo: `Why ${newCompetitor} is taking over`
        };
        setCompetitors([...competitors, mockCompetitor]);
        setNewCompetitor('');
    };

    const handleDelete = (id: string) => {
        setCompetitors(competitors.filter(c => c.id !== id));
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Competitor Intelligence</h1>
                <p className="text-muted-foreground">Track other channels in your niche to spot trends early.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tracked Channels</CardTitle>
                    <CardDescription>Add a channel URL or name to start tracking.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 max-w-xl mb-8">
                        <Input
                            placeholder="Enter channel name..."
                            value={newCompetitor}
                            onChange={(e) => setNewCompetitor(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                        <Button onClick={handleAdd}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                        </Button>
                    </div>

                    {competitors.length > 0 ? (
                        <div className="space-y-4">
                            {competitors.map((comp) => (
                                <div key={comp.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {comp.name[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{comp.name}</h4>
                                            <p className="text-sm text-muted-foreground">{comp.subscribers} Subs • {comp.recentUploads} uploads this week</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:block text-right">
                                            <p className="text-xs text-muted-foreground">Top Recent Video</p>
                                            <p className="text-sm font-medium truncate max-w-[200px]">{comp.topVideo}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(comp.id)}>
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={Users}
                            title="No Competitors Added"
                            description="Add competitors to benchmark your performance and get content alerts."
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
