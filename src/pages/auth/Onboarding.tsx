import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { useAppStore } from '../../store/useAppStore';
import { Gamepad2, GraduationCap, MonitorPlay, PiggyBank, Smile, Camera } from 'lucide-react';
import { cn } from '../../utils/cn';

const niches = [
    { id: 'tech', label: 'Tech & Reviews', icon: MonitorPlay },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'finance', label: 'Finance', icon: PiggyBank },
    { id: 'vlog', label: 'Vlogs & Lifestyle', icon: Smile },
    { id: 'shorts', label: 'Shorts Only', icon: Camera },
];

export function Onboarding() {
    const navigate = useNavigate();
    const { updateNiche } = useAppStore();
    const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

    const handleComplete = () => {
        if (selectedNiche) {
            updateNiche(selectedNiche);
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl border-border">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Setup Your Channel</CardTitle>
                    <CardDescription>Select your primary content niche to get personalized AI insights.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {niches.map((niche) => (
                            <button
                                key={niche.id}
                                onClick={() => setSelectedNiche(niche.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all hover:bg-muted/50",
                                    selectedNiche === niche.id
                                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                                        : "border-muted hover:border-gray-500"
                                )}
                            >
                                <niche.icon size={32} className={cn("mb-3", selectedNiche === niche.id ? "text-primary" : "text-muted-foreground")} />
                                <span className={cn("font-medium text-sm", selectedNiche === niche.id ? "text-foreground" : "text-muted-foreground")}>{niche.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                        <Button
                            onClick={handleComplete}
                            disabled={!selectedNiche}
                            size="lg"
                            className="px-8"
                        >
                            Complete Setup
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
