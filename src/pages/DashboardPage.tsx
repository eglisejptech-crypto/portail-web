import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Heart, Calendar, BookOpen, Home, Menu, X } from 'lucide-react';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname.includes(path);

  const menuItems = [
    { path: '/dashboard/users', label: t('dashboard.users'), icon: Users },
    { path: '/dashboard/ministries', label: t('dashboard.ministries'), icon: Heart },
    { path: '/dashboard/familles-impact', label: t('dashboard.famillesImpact'), icon: Users },
    { path: '/dashboard/events', label: t('dashboard.events'), icon: Calendar },
    { path: '/dashboard/weeklyVerses', label: t('dashboard.weeklyVerses'), icon: BookOpen },
  ];

  const navContent = (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive(item.path)
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-3 pt-20 pb-6 sm:px-4 sm:pt-24 md:pt-28 lg:pt-32 lg:px-6">
      {/* Bouton menu mobile */}
      <div className="mb-4 flex items-center gap-3 md:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-md text-gray-700 hover:bg-gray-50"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-800 truncate">{t('dashboard.title')}</h2>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-label="Fermer"
        />
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar: drawer mobile, fixe desktop */}
        <aside
          className={`
            fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw] bg-white shadow-xl p-4 pt-20
            transform transition-transform duration-200 ease-out md:relative md:transform-none
            md:w-64 md:max-w-none md:h-auto md:pt-6 md:rounded-lg md:shadow-md
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 hidden md:block">
            {t('dashboard.title')}
          </h2>
          {navContent}
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 min-w-0 bg-white rounded-lg shadow-md p-4 sm:p-6">
          {location.pathname === '/dashboard' ? (
            <div className="text-center py-8 sm:py-12">
              <Home className="h-14 w-14 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                Bienvenue sur le tableau de bord
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Choisissez une section dans le menu pour commencer.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};
