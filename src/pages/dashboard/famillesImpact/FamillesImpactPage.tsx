import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { impactFamilyService } from '../../../services/impactFamily.service';
import { FamilleImpact } from '../../../types';

const FamillesImpactPage = () => {
  const { t } = useTranslation();
  const [familles, setFamilles] = useState<FamilleImpact[]>([]);
  const [filteredFamilles, setFilteredFamilles] = useState<FamilleImpact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFamilles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await impactFamilyService.getAll();
      setFamilles(response.data);
      setFilteredFamilles(response.data);
    } catch (err) {
      setError(t('common.errorLoad') || 'Impossible de charger les familles d\'impact');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadFamilles();
  }, [loadFamilles]);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = familles.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          (f.description && f.description.toLowerCase().includes(term)) ||
          (f.address && f.address.toLowerCase().includes(term))
      );
      setFilteredFamilles(filtered);
    } else {
      setFilteredFamilles(familles);
    }
  }, [searchTerm, familles]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('common.search')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {filteredFamilles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune famille d'impact trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFamilles.map((famille) => (
            <Link
              key={famille.id}
              to={`/dashboard/familles-impact/${famille.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="w-full h-32 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                <Users className="h-16 w-16 text-white opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{famille.name}</h3>
                {famille.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{famille.description}</p>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{famille.memberCount} membre{famille.memberCount !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamillesImpactPage;
