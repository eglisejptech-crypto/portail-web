import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Users, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { memberService } from '../../../services/member.service';
import { ministryService } from '../../../services/ministry.service';
import { impactFamilyService } from '../../../services/impactFamily.service';
import { Member, Ministry, FamilleImpact } from '../../../types';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [member, setMember] = useState<Member | null>(null);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [impactFamily, setImpactFamily] = useState<FamilleImpact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDetails = useCallback(async () => {
    if (!id) return;
    const memberId = Number(id);
    try {
      setLoading(true);
      setError('');
      const [memberData, ministryIds] = await Promise.all([
        memberService.getById(memberId),
        memberService.getMemberMinistries(memberId),
      ]);
      setMember(memberData);

      const ministryNames = await Promise.all(
        ministryIds.map((mid) => ministryService.getById(mid))
      ).catch(() => [] as Ministry[]);
      setMinistries(ministryNames);

      const family = await impactFamilyService.findFamilyByMemberId(memberId);
      setImpactFamily(family);
    } catch (err) {
      setError(t('common.errorLoad') || 'Impossible de charger la fiche du membre');
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

  if (error || !member) {
    return (
      <div>
        <Link
          to="/dashboard/users"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour aux membres</span>
        </Link>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Membre non trouvé'}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard/users"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour aux membres</span>
        </Link>
        <Link
          to={`/dashboard/users/${id}/edit`}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Edit className="h-5 w-5" />
          <span>{t('common.edit')}</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-full md:w-64 h-64 object-cover"
            />
          ) : (
            <div className="w-full md:w-64 h-64 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
              <Users className="h-24 w-24 text-white opacity-50" />
            </div>
          )}
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {member.firstName} {member.lastName}
            </h1>
            {member.roles && member.roles.length > 0 && (
              <p className="text-sm text-gray-500 mb-6">
                {member.roles.join(', ')}
              </p>
            )}

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-gray-800">{member.email}</dd>
                </div>
              </div>
              {member.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd className="text-gray-800">{member.phone}</dd>
                  </div>
                </div>
              )}
              {member.address && (
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                    <dd className="text-gray-800">
                      {[member.address, member.city, member.country]
                        .filter(Boolean)
                        .join(', ')}
                    </dd>
                  </div>
                </div>
              )}
              {member.gender && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Genre</dt>
                  <dd className="text-gray-800">{member.gender}</dd>
                </div>
              )}
              {member.status && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Statut</dt>
                  <dd className="text-gray-800">{member.status}</dd>
                </div>
              )}
              {member.createdAt && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Inscrit le</dt>
                  <dd className="text-gray-800">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>

            <div className="border-t pt-6 space-y-6">
              {impactFamily && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    Famille d'impact
                  </h3>
                  <Link
                    to={`/dashboard/familles-impact/${impactFamily.id}`}
                    className="inline-flex items-center px-4 py-2 bg-rose-50 text-rose-800 rounded-lg hover:bg-rose-100"
                  >
                    {impactFamily.name}
                  </Link>
                </div>
              )}

              {ministries.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Ministère(s)
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {ministries.map((m) => (
                      <li key={m.id}>
                        <Link
                          to={`/dashboard/ministries/${m.id}`}
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100"
                        >
                          {m.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!impactFamily && ministries.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Aucune famille d'impact ni ministère assigné pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
