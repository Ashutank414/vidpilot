import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, KeyRound, Sparkles, Users, Calendar, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Video Analyzer', path: '/analyzer' },
    { icon: KeyRound, label: 'Keywords', path: '/keywords' },
    { icon: Sparkles, label: 'AI Studio', path: '/ai-studio' },
    { icon: Users, label: 'Competitors', path: '/competitors' },
    { icon: Calendar, label: 'Planner', path: '/planner' },
];

export function Sidebar() {
    return (
        <aside className="w-64 border-r border-border bg-card flex flex-col h-screen fixed left-0 top-0 z-30 hidden md:flex">
            <div className="p-6 border-b border-border">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Vidpilot
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground w-full rounded-md hover:bg-muted transition-colors">
                    <Settings size={18} />
                    Settings
                </button>
            </div>
        </aside>
    );
}
