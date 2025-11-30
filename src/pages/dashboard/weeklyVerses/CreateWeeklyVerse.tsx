import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CreateWeeklyVerse = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    reference: '',
    text: '',
    weekStartDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/weeklyVerses');
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to="/dashboard/weeklyVerses"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Weekly Verses</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Weekly Verse</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bible Reference
            </label>
            <input
              type="text"
              placeholder="e.g., John 3:16"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verse Text
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Week Start Date
            </label>
            <input
              type="date"
              value={formData.weekStartDate}
              onChange={(e) => setFormData({ ...formData, weekStartDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              to="/dashboard/weeklyVerses"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              {t('common.cancel')}
            </Link>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="h-5 w-5" />
              <span>{t('common.save')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWeeklyVerse;
