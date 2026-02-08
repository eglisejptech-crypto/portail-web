import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Users, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { impactFamilyService } from '../../../services/impactFamily.service';
import { FamilleImpact, Member } from '../../../types';

const FamilleImpactDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [family, setFamily] = useState<FamilleImpact | null>(null);
  const [pilots, setPilots] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDetails = useCallback(async () => {
    if (!id) return;
    const familyId = Number(id);
    try {
      setLoading(true);
      setError('');
      const [familyData, pilotsRes] = await Promise.all([
        impactFamilyService.getById(familyId),
        impactFamilyService.getPilotsByImpactFamily(familyId, 0, 200),
      ]);
      setFamily(familyData);
      setPilots(pilotsRes.data || []);
    } catch (err) {
      setError(t('common.errorLoad') || 'Impossible de charger la famille d\'impact');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  if (error || !family) {
    return (
      <div>
        <Link
          to="/dashboard/familles-impact"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour aux familles d'impact</span>
        </Link>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Famille d\'impact non trouvée'}
        </div>
      </div>
    );
  }

  const pilotIds = new Set(pilots.map((p) => p.id));
  const membersWithRole: Array<Member & { isPilot: boolean }> = (family.users || []).map((u) => ({
    ...u,
    isPilot: pilotIds.has(u.id),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard/familles-impact"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour aux familles d'impact</span>
        </Link>
        <Link
          to={`/dashboard/familles-impact/${id}/edit`}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Edit className="h-5 w-5" />
          <span>{t('common.edit')}</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="w-full h-40 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
          <Users className="h-20 w-20 text-white opacity-50" />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{family.name}</h1>
          {family.description && (
            <p className="text-gray-600 mb-6">{family.description}</p>
          )}
          {family.address && (
            <p className="text-gray-500 text-sm flex items-center gap-2 mb-6">
              <MapPin className="h-4 w-4" />
              {family.address}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">Membres</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">{family.memberCount}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-800">Pilotes</h3>
              </div>
              <p className="text-3xl font-bold text-amber-600">{pilots.length}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Liste des membres de la famille</h3>
            {membersWithRole.length === 0 ? (
              <p className="text-gray-500">Aucun membre dans cette famille pour le moment.</p>
            ) : (
              <ul className="space-y-2">
                {membersWithRole.map((m) => (
                  <li key={m.id}>
                    <Link
                      to={`/dashboard/users/${m.id}`}
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-800">
                          {m.firstName} {m.lastName}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            m.isPilot
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {m.isPilot ? 'Pilote' : 'Membre'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{m.email}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t pt-6 mt-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Créée le</dt>
                <dd className="text-gray-800">
                  {family.createdAt && new Date(family.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Dernière mise à jour</dt>
                <dd className="text-gray-800">
                  {family.updatedAt && new Date(family.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilleImpactDetails;
