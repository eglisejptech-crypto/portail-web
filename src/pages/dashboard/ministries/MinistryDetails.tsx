import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Users, Calendar, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ministryService } from '../../../services/ministry.service';
import { useScrollToError } from '../../../hooks/useScrollToError';
import { Ministry, Member } from '../../../types';

const MinistryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [ministry, setMinistry] = useState<Ministry | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showCoordinators, setShowCoordinators] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useScrollToError(error);

  const loadMinistry = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await ministryService.getById(Number(id));
      setMinistry(data);
    } catch (err) {
      setError('Impossible de charger le ministère');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMinistry();
  }, [loadMinistry]);

  const loadMinistryMembers = useCallback(async () => {
    if (!id) return;
    setLoadingMembers(true);
    try {
      const res = await ministryService.getMinistryMembers(Number(id), 0, 500);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      setMembers([]);
    } finally {
      setLoadingMembers(false);
    }
  }, [id]);

  const handleShowMembers = () => {
    if (members.length === 0 && !loadingMembers) loadMinistryMembers();
    setShowMembers(true);
    setShowCoordinators(false);
  };

  const handleShowCoordinators = () => {
    if (members.length === 0 && !loadingMembers) loadMinistryMembers();
    setShowCoordinators(true);
    setShowMembers(false);
  };

  const coordinators =
    ministry && members.length > 0
      ? members.filter((m) => ministry.coordinatorIds.includes(m.id))
      : [];

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

        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 break-words">{ministry.name}</h1>
          <p className="text-gray-600 text-lg mb-8">{ministry.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
            <button
              type="button"
              onClick={handleShowMembers}
              className="bg-gray-50 p-6 rounded-lg text-left hover:bg-gray-100 transition-colors border border-transparent hover:border-blue-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Membres</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">{ministry.memberCount}</p>
              <p className="text-sm text-gray-500 mt-1">Cliquer pour voir la liste</p>
            </button>

            <button
              type="button"
              onClick={handleShowCoordinators}
              className="bg-gray-50 p-6 rounded-lg text-left hover:bg-gray-100 transition-colors border border-transparent hover:border-green-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <UserCheck className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Coordinateurs</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">{ministry.coordinatorIds.length}</p>
              <p className="text-sm text-gray-500 mt-1">Cliquer pour voir la liste</p>
            </button>

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

          {(showMembers || showCoordinators) && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {showMembers ? 'Liste des membres' : 'Liste des coordinateurs'}
              </h3>
              {loadingMembers ? (
                <p className="text-gray-500">{t('common.loading')}</p>
              ) : showMembers ? (
                <ul className="space-y-2">
                  {members.map((m) => (
                    <li key={m.id}>
                      <Link
                        to={`/dashboard/users/${m.id}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-800">
                          {m.firstName} {m.lastName}
                        </span>
                        <span className="text-sm text-gray-500">{m.email}</span>
                      </Link>
                    </li>
                  ))}
                  {members.length === 0 && (
                    <p className="text-gray-500">Aucun membre dans ce ministère.</p>
                  )}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {coordinators.map((m) => (
                    <li key={m.id}>
                      <Link
                        to={`/dashboard/users/${m.id}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-800">
                          {m.firstName} {m.lastName}
                        </span>
                        <span className="text-sm text-gray-500">{m.email}</span>
                      </Link>
                    </li>
                  ))}
                  {coordinators.length === 0 && (
                    <p className="text-gray-500">Aucun coordinateur pour ce ministère.</p>
                  )}
                </ul>
              )}
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Informations</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Dernière mise à jour</dt>
                <dd className="text-lg text-gray-800">
                  {new Date(ministry.updatedAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">ID du ministère</dt>
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
