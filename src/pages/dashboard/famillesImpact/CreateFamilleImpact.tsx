import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CreateFamilleImpact = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/familles-impact');
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to="/dashboard/familles-impact"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Impact Families</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Impact Family</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Family Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              to="/dashboard/familles-impact"
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

export default CreateFamilleImpact;
