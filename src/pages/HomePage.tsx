import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Calendar, BookOpen, Heart } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">{t('app.name')}</h1>
        <p className="text-xl text-gray-600">{t('app.tagline')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <Users className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('dashboard.users')}</h3>
          <p className="text-gray-600">Manage youth members and their information</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <Heart className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('dashboard.ministries')}</h3>
          <p className="text-gray-600">Organize and track ministry activities</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <Calendar className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('dashboard.events')}</h3>
          <p className="text-gray-600">Plan and manage upcoming events</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('dashboard.weeklyVerses')}</h3>
          <p className="text-gray-600">Share weekly Bible verses with the community</p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
        >
          {t('nav.login')}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
