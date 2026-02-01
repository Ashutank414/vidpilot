import { Login } from '@/pages/auth/Login';
import { Onboarding } from '@/pages/auth/Onboarding';
import { Dashboard } from '@/pages/dashboard/Dashboard';
import { Analyzer } from '@/pages/analyzer/Analyzer';
import { Keywords } from '@/pages/keywords/Keywords';
import { AiStudio } from '@/pages/ai-studio/AiStudio';
import { Competitors } from '@/pages/competitors/Competitors';
import { Planner } from '@/pages/planner/Planner';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analyzer" element={<Analyzer />} />
                    <Route path="/keywords" element={<Keywords />} />
                    <Route path="/ai-studio" element={<AiStudio />} />
                    <Route path="/competitors" element={<Competitors />} />
                    <Route path="/planner" element={<Planner />} />
                </Route>
            </Route>

            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
