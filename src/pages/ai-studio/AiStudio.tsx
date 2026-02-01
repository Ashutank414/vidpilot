import React, { useState } from 'react';
import { Sparkles, Copy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { useAi } from '../../hooks/useAi';

export function AiStudio() {
    const [generatedResult, setGeneratedResult] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState('titles');
    const [topic, setTopic] = useState('');

    const { generate, isLoading, error } = useAi({
        onSuccess: (data) => setGeneratedResult(data),
    });

    const handleGenerate = async () => {
        if (!topic) return;
        await generate(topic, activeTab as 'titles' | 'description' | 'thumbnails');
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">AI Studio</h1>
                <p className="text-muted-foreground">Generate viral titles, optimized descriptions, and high-CTR thumbnail ideas.</p>
            </div>

            <Tabs defaultValue="titles" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="titles">Titles</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="thumbnails">Thumbnails</TabsTrigger>
                </TabsList>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Side */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Generator Settings</CardTitle>
                            <CardDescription>Tell the AI what your video is about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Video Topic</label>
                                <Input
                                    placeholder="e.g. How to bake sourdough bread"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>
                            <Button className="w-full mt-4" onClick={handleGenerate} disabled={isLoading || !topic}>
                                {isLoading ? <Sparkles className="animate-spin mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                {isLoading ? 'Generating...' : 'Generate Ideas'}
                            </Button>
                            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                        </CardContent>
                    </Card>

                    {/* Output Side */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">AI Suggestions</h2>
                        {generatedResult.length > 0 ? (
                            <div className="space-y-3">
                                {generatedResult.map((res, i) => (
                                    <div key={i} className="p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors group relative">
                                        <p className="font-medium text-sm pr-8 whitespace-pre-wrap">{res}</p>
                                        <button className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground p-8 text-center bg-muted/10">
                                <Sparkles className="h-12 w-12 mb-4 text-muted-foreground/30" />
                                <p>Enter details and click generate to see AI magic happen.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
