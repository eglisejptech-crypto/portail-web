import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UserDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard/users"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Members</span>
        </Link>
        <Link
          to={`/dashboard/users/${id}/edit`}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Edit className="h-5 w-5" />
          <span>{t('common.edit')}</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Member Details</h1>
        <p className="text-gray-600">User ID: {id}</p>
      </div>
    </div>
  );
};
