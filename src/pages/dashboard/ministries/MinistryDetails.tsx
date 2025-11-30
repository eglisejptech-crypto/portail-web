import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Users, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ministryService } from '../../../services/ministry.service';
import { Ministry } from '../../../types';

const MinistryDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [ministry, setMinistry] = useState<Ministry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadMinistry();
    }
  }, [id]);

  const loadMinistry = async () => {
    try {
      setLoading(true);
      const data = await ministryService.getById(Number(id));
      setMinistry(data);
    } catch (err) {
      setError('Failed to load ministry details');
      console.error(err);
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

  if (error || !ministry) {
    return (
      <div>
        <Link
          to="/dashboard/ministries"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Ministries</span>
        </Link>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Ministry not found'}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard/ministries"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Ministries</span>
        </Link>
        <Link
          to={`/dashboard/ministries/${id}/edit`}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Edit className="h-5 w-5" />
          <span>{t('common.edit')}</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {ministry.imageUrl ? (
          <img
            src={ministry.imageUrl}
            alt={ministry.name}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Users className="h-32 w-32 text-white opacity-50" />
          </div>
        )}

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{ministry.name}</h1>
          <p className="text-gray-600 text-lg mb-8">{ministry.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Members</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">{ministry.memberCount}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Coordinators</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">{ministry.coordinatorIds.length}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Created</h3>
              </div>
              <p className="text-lg text-gray-600">
                {new Date(ministry.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ministry Information</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="text-lg text-gray-800">
                  {new Date(ministry.updatedAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Ministry ID</dt>
                <dd className="text-lg text-gray-800">{ministry.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetails;
