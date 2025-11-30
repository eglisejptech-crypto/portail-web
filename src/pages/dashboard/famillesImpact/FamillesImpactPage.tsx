import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FamillesImpactPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('dashboard.famillesImpact')}</h1>
        <Link
          to="/dashboard/familles-impact/create"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>{t('common.create')}</span>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={t('common.search')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center py-12 col-span-full">
          <p className="text-gray-500">No Impact Families found</p>
        </div>
      </div>
    </div>
  );
};

export default FamillesImpactPage;
