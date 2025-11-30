import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Heart, Calendar, BookOpen, Home } from 'lucide-react';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  const menuItems = [
    { path: '/dashboard/users', label: t('dashboard.users'), icon: Users },
    { path: '/dashboard/ministries', label: t('dashboard.ministries'), icon: Heart },
    { path: '/dashboard/familles-impact', label: t('dashboard.famillesImpact'), icon: Users },
    { path: '/dashboard/events', label: t('dashboard.events'), icon: Calendar },
    { path: '/dashboard/weeklyVerses', label: t('dashboard.weeklyVerses'), icon: BookOpen },
  ];

  return (
    <div className="container mx-auto px-4 pt-32 pb-8">
      <div className="flex gap-6">
        <aside className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('dashboard.title')}</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-md p-6">
          {location.pathname === '/dashboard' ? (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Welcome to Dashboard
              </h3>
              <p className="text-gray-600">Select a section from the menu to get started</p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};
