import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { weeklyVerseService } from '../../../services/weeklyVerse.service';
import { WeeklyVerse } from '../../../types';

const WeeklyVersePage = () => {
  const { t } = useTranslation();
  const [verses, setVerses] = useState<WeeklyVerse[]>([]);
  const [filteredVerses, setFilteredVerses] = useState<WeeklyVerse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVerses();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = verses.filter(
        (v) =>
          v.reference.toLowerCase().includes(term) ||
          (v.text && v.text.toLowerCase().includes(term))
      );
      setFilteredVerses(filtered);
    } else {
      setFilteredVerses(verses);
    }
  }, [searchTerm, verses]);

  const loadVerses = async () => {
    try {
      setLoading(true);
      const response = await weeklyVerseService.getAll();
      setVerses(response.data);
      setFilteredVerses(response.data);
    } catch (err) {
      console.error(err);
      setVerses([]);
      setFilteredVerses([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('dashboard.weeklyVerses')}</h1>
        <Link
          to="/dashboard/weeklyVerses/create"
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

      {filteredVerses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun verset hebdomadaire trouvé</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVerses.map((verse) => (
            <Link
              key={verse.id}
              to={`/dashboard/weeklyVerses/${verse.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800">{verse.reference}</h3>
                  {verse.weekStartDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Semaine du {new Date(verse.weekStartDate).toLocaleDateString()}
                    </p>
                  )}
                  {verse.text && (
                    <p className="text-gray-600 mt-2 line-clamp-2">{verse.text}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyVersePage;
