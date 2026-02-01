import React from 'react';
import { Bell, UserCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';

export function TopBar() {
    const { user, dateRange, setDateRange } = useAppStore();

    return (
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-20 md:ml-64">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold hidden sm:block">
                    Welcome back, {user?.name || 'Creator'}
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex bg-muted rounded-md p-1">
                    <button
                        onClick={() => setDateRange('7d')}
                        className={`text-xs px-3 py-1 rounded-sm transition-all ${dateRange === '7d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        7 Days
                    </button>
                    <button
                        onClick={() => setDateRange('28d')}
                        className={`text-xs px-3 py-1 rounded-sm transition-all ${dateRange === '28d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        28 Days
                    </button>
                </div>

                <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
                </Button>

                <div className="flex items-center gap-2 border-l border-border pl-4">
                    {user?.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="h-8 w-8 rounded-full" />
                    ) : (
                        <UserCircle size={32} className="text-muted-foreground" />
                    )}
                </div>
            </div>
        </header>
    );
}
