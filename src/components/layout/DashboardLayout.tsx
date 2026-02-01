import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Sidebar />
            <TopBar />
            <main className="md:ml-64 p-6 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
