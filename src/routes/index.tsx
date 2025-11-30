import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsPage from '../pages/TermsPage';
import { AdminGuard } from '../components/AdminGuard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/privacy',
        element: <PrivacyPage />
    },
    {
        path: '/terms',
        element: <TermsPage />
    },
    {
        path: '/admin',
        element: (
            <AdminGuard>
                <DashboardPage />
            </AdminGuard>
        )
    }
]);
