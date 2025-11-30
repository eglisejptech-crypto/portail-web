import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { useTranslation } from 'react-i18next';
import { Users, LogOut, Home, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Users className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">{t('app.name')}</span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>

          <Link to="/" className="flex items-center space-x-1 hover:text-blue-600">
            <Home className="h-5 w-5" />
            <span>{t('nav.home')}</span>
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="flex items-center space-x-1 hover:text-blue-600">
                <LayoutDashboard className="h-5 w-5" />
                <span>{t('nav.dashboard')}</span>
              </Link>

              {user && (
                <span className="text-sm text-gray-600">
                  {user.firstName} {user.lastName}
                </span>
              )}

              <button
                onClick={logout}
                className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span>{t('nav.logout')}</span>
              </button>
            </>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t('nav.login')}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
