import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Users,
  Heart,
  UserPlus,
  UserMinus,
  Shield,
  ShieldOff,
  Plus,
  Minus,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthProvider';
import { memberService } from '../../../services/member.service';
import { ministryService } from '../../../services/ministry.service';
import { impactFamilyService } from '../../../services/impactFamily.service';
import { useScrollToError } from '../../../hooks/useScrollToError';
import { Member, Ministry, FamilleImpact } from '../../../types';

const ROLES_OPTIONS = [
  { value: 'MEMBER', label: 'Membre' },
  { value: 'COORDINATOR', label: 'Coordinateur' },
  { value: 'PASTORAL', label: 'Pastoral' },
  { value: 'PILOT', label: 'Pilote' },
] as const;

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const currentRoles = currentUser?.roles ?? [];

  const [member, setMember] = useState<Member | null>(null);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [impactFamily, setImpactFamily] = useState<FamilleImpact | null>(null);
  const [allFamilies, setAllFamilies] = useState<FamilleImpact[]>([]);
  const [isPilotOfCurrentFamily, setIsPilotOfCurrentFamily] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('');
  const [selectedPilotFamilyId, setSelectedPilotFamilyId] = useState<string>('');
  const [selectedRoleToAdd, setSelectedRoleToAdd] = useState<string>('');
  const [allMinistriesForCoordinator, setAllMinistriesForCoordinator] = useState<Ministry[]>([]);
  const [searchCoordinatorMinistry, setSearchCoordinatorMinistry] = useState('');
  const [selectedCoordinatorMinistryId, setSelectedCoordinatorMinistryId] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useScrollToError(error);

  const loadDetails = useCallback(async () => {
    if (!id) return;
    const memberId = Number(id);
    try {
      setLoading(true);
      setError('');
      const [memberData, ministryIds, family, familiesRes] = await Promise.all([
        memberService.getById(memberId),
        memberService.getMemberMinistries(memberId),
        impactFamilyService.findFamilyByMemberId(memberId),
        impactFamilyService.getAll(0, 200),
      ]);
      setMember(memberData);
      setImpactFamily(family);
      setAllFamilies(familiesRes.data || []);

      let pilotOfFamily = false;
      if (family) {
        try {
          const pilotsRes = await impactFamilyService.getPilotsByImpactFamily(family.id, 0, 100);
          pilotOfFamily = (pilotsRes.data || []).some((p) => p.id === memberId);
        } catch {
          // ignore
        }
      }
      setIsPilotOfCurrentFamily(pilotOfFamily);

      const ministryList = await Promise.all(
        ministryIds.map((mid) => ministryService.getById(mid))
      ).catch(() => [] as Ministry[]);
      setMinistries(ministryList);
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

  const memberHasCoordinatorRole = Boolean(member?.roles?.includes('COORDINATOR'));
  const canAssignCoordinatorMinistry = currentRoles.includes('PASTORAL');

  useEffect(() => {
    if (!memberHasCoordinatorRole || !canAssignCoordinatorMinistry) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await ministryService.getAll(0, 500);
        if (!cancelled && res?.data) setAllMinistriesForCoordinator(res.data);
      } catch {
        if (!cancelled) setAllMinistriesForCoordinator([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [memberHasCoordinatorRole, canAssignCoordinatorMinistry]);

  const coordinatorMinistries = ministries.filter(
    (m) => member && m.coordinatorIds?.includes(member.id)
  );

  const canManageRoles = currentRoles.includes('PASTORAL') || currentRoles.includes('COORDINATOR');
  const canManageImpactFamily = currentRoles.includes('PASTORAL');
  const canDemoteCoordinator = currentRoles.includes('PASTORAL');

  const handleAddRole = async (role: string) => {
    if (!id || !member) return;
    if (role === 'PILOT') {
      if (!impactFamily) {
        setError(
          `${member.firstName} ${member.lastName} n'a présentement aucune famille d'impact. Vous devez d'abord l'ajouter à une famille avant de lui attribuer le rôle Pilote.`
        );
      } else {
        setError(
          'Pour attribuer le rôle Pilote, utilisez la section « Gestion famille d\'impact » ci-dessous et cliquez sur « Assigner comme pilote » en choisissant la famille concernée.'
        );
      }
      setSelectedRoleToAdd('');
      return;
    }
    setActionLoading(`add-role-${role}`);
    setError('');
    setSuccess('');
    try {
      await memberService.updateRole(Number(id), { role });
      setSuccess(`Rôle ${role} ajouté.`);
      setSelectedRoleToAdd('');
      setMember(await memberService.getById(Number(id)));
    } catch (err) {
      setError('Erreur lors de l\'ajout du rôle.');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemovePilotFromFamily = async () => {
    if (!impactFamily || !id) return;
    setActionLoading('remove-pilot');
    setError('');
    setSuccess('');
    try {
      await impactFamilyService.removePilotFromImpactFamily(impactFamily.id, Number(id));
      setSuccess('Rôle pilote retiré pour cette famille.');
      setIsPilotOfCurrentFamily(false);
      setMember(await memberService.getById(Number(id)));
    } catch (err) {
      setError('Erreur lors du retrait du rôle pilote.');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAssignToFamily = async () => {
    const familyId = selectedFamilyId ? Number(selectedFamilyId) : null;
    if (!familyId || !id) return;
    setActionLoading('assign-family');
    setError('');
    setSuccess('');
    try {
      await impactFamilyService.assignMemberToImpactFamily(familyId, Number(id));
      setSuccess('Membre assigné à la famille d\'impact.');
      setSelectedFamilyId('');
      await loadDetails();
    } catch (err) {
      setError('Erreur lors de l\'assignation.');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAssignPilot = async () => {
    const familyId = selectedPilotFamilyId ? Number(selectedPilotFamilyId) : null;
    if (!familyId || !id) return;
    setActionLoading('assign-pilot');
    setError('');
    setSuccess('');
    try {
      await impactFamilyService.assignPilotToImpactFamily(familyId, Number(id));
      setSuccess('Membre assigné comme pilote.');
      setSelectedPilotFamilyId('');
      await loadDetails();
    } catch {
      setError('Une erreur s\'est produite lors de l\'assignation comme pilote.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveFromFamily = async () => {
    if (!impactFamily || !id) return;
    setActionLoading('remove-family');
    setError('');
    setSuccess('');
    try {
      await impactFamilyService.removeMemberFromImpactFamily(impactFamily.id, Number(id));
      setSuccess('Membre retiré de la famille d\'impact.');
      await loadDetails();
    } catch (err) {
      setError('Erreur lors du retrait.');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAssignCoordinatorToMinistry = async () => {
    const ministryId = selectedCoordinatorMinistryId ? Number(selectedCoordinatorMinistryId) : null;
    if (!ministryId || !id) return;
    setActionLoading('assign-coordinator');
    setError('');
    setSuccess('');
    try {
      try {
        await ministryService.assignMemberToMinistry(ministryId, Number(id));
      } catch {
        // Déjà assigné au ministère : on continue pour la promotion
      }
      await ministryService.promoteToCoordinator(ministryId, Number(id));
      setSuccess('Membre assigné comme coordinateur de ce ministère.');
      setSelectedCoordinatorMinistryId('');
      setSearchCoordinatorMinistry('');
      await loadDetails();
    } catch {
      setError('Une erreur s\'est produite lors de l\'assignation comme coordinateur.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDemoteCoordinator = async (ministryId: number) => {
    if (!id) return;
    setActionLoading(`demote-${ministryId}`);
    setError('');
    setSuccess('');
    try {
      await ministryService.demoteCoordinator(ministryId, Number(id));
      setSuccess('Coordinateur rétrogradé.');
      await loadDetails();
    } catch (err) {
      setError('Erreur lors de la rétrogradation.');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  if (!member) {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          to="/dashboard/users"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour aux membres</span>
        </Link>
        <Link
          to={`/dashboard/users/${id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Edit className="h-5 w-5" />
          <span>{t('common.edit')}</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
          <div className="flex-1 p-4 sm:p-6 md:p-8 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 break-words">
              {member.firstName} {member.lastName}
            </h1>
            {member.roles && member.roles.length > 0 && (
              <p className="text-sm text-gray-500 mb-6">
                {member.roles.join(', ')}
              </p>
            )}

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-gray-800">{member.email}</dd>
                </div>
              </div>
              {member.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd className="text-gray-800">{member.phone}</dd>
                  </div>
                </div>
              )}
              {member.address && (
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                    <dd className="text-gray-800">
                      {[member.address, member.city, member.country].filter(Boolean).join(', ')}
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

      {/* Rôles du membre — visible pour PASTORAL et COORDINATOR (backend restreint COORDINATOR) */}
      {canManageRoles && (
        <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            Rôles du membre
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Un membre peut avoir plusieurs rôles. Pour retirer : coordinateur → section « Rétrograder coordinateur » ; pilote → « Retirer comme pilote » dans la famille.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {(member.roles || []).map((r) => (
              <span
                key={r}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {ROLES_OPTIONS.find((o) => o.value === r)?.label ?? r}
              </span>
            ))}
            {(member.roles?.length ?? 0) === 0 && (
              <span className="text-sm text-gray-500">Aucun rôle</span>
            )}
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ajouter un rôle</label>
              <select
                value={selectedRoleToAdd}
                onChange={(e) => setSelectedRoleToAdd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choisir un rôle</option>
                {ROLES_OPTIONS.filter((o) => !(member.roles || []).includes(o.value)).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => selectedRoleToAdd && handleAddRole(selectedRoleToAdd)}
              disabled={!selectedRoleToAdd || !!actionLoading?.startsWith('add-role')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {actionLoading?.startsWith('add-role') ? 'Ajout…' : 'Ajouter'}
            </button>
          </div>
        </section>
      )}

      {/* Famille d'impact — assigner / retirer / pilote : PASTORAL uniquement (backend) */}
      {canManageImpactFamily && (
        <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            Gestion famille d'impact
          </h2>
          {impactFamily ? (
            <div className="mb-4 p-4 bg-rose-50 rounded-lg space-y-3">
              <p className="text-sm text-gray-700">
                Ce membre appartient à la famille : <strong>{impactFamily.name}</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleRemoveFromFamily}
                  disabled={actionLoading === 'remove-family'}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 text-sm"
                >
                  <UserMinus className="h-4 w-4" />
                  {actionLoading === 'remove-family' ? 'En cours…' : 'Retirer de cette famille'}
                </button>
                {isPilotOfCurrentFamily && (
                  <button
                    type="button"
                    onClick={handleRemovePilotFromFamily}
                    disabled={actionLoading === 'remove-pilot'}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 text-sm"
                  >
                    <Minus className="h-4 w-4" />
                    {actionLoading === 'remove-pilot' ? 'En cours…' : 'Retirer comme pilote de cette famille'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4">Ce membre n'est dans aucune famille d'impact.</p>
          )}
          {!impactFamily && (
            <div className="flex flex-wrap items-end gap-3 mb-4">
              <div className="min-w-[200px] flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigner à une famille</label>
                <select
                  value={selectedFamilyId}
                  onChange={(e) => setSelectedFamilyId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choisir une famille</option>
                  {allFamilies.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleAssignToFamily}
                disabled={!selectedFamilyId || actionLoading === 'assign-family'}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50"
              >
                <UserPlus className="h-4 w-4" />
                {actionLoading === 'assign-family' ? 'En cours…' : 'Assigner'}
              </button>
            </div>
          )}
          {impactFamily && (
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-[200px] flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigner comme pilote</label>
                <select
                  value={selectedPilotFamilyId}
                  onChange={(e) => setSelectedPilotFamilyId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choisir une famille</option>
                  {allFamilies.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleAssignPilot}
                disabled={!selectedPilotFamilyId || actionLoading === 'assign-pilot'}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                <UserPlus className="h-4 w-4" />
                {actionLoading === 'assign-pilot' ? 'En cours…' : 'Assigner comme pilote'}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Assigner comme coordinateur d'un ministère — visible quand le membre a le rôle Coordinateur, action PASTORAL */}
      {memberHasCoordinatorRole && canAssignCoordinatorMinistry && (
        <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Assigner comme coordinateur d'un ministère
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Ce membre a le rôle Coordinateur. Choisissez un ministère pour l'y assigner comme coordinateur (il peut en avoir plusieurs).
          </p>
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher un ministère</label>
              <input
                type="text"
                value={searchCoordinatorMinistry}
                onChange={(e) => setSearchCoordinatorMinistry(e.target.value)}
                placeholder="Nom du ministère..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="min-h-[120px] max-h-[220px] overflow-y-auto border border-gray-200 rounded-lg bg-gray-50">
              <ul className="p-1">
                {allMinistriesForCoordinator
                  .filter(
                    (m) =>
                      !coordinatorMinistries.some((c) => c.id === m.id) &&
                      m.name.toLowerCase().includes(searchCoordinatorMinistry.toLowerCase().trim())
                  )
                  .map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCoordinatorMinistryId(String(m.id));
                          setSearchCoordinatorMinistry(m.name);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedCoordinatorMinistryId === String(m.id)
                            ? 'bg-green-100 text-green-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        {m.name}
                      </button>
                    </li>
                  ))}
              </ul>
              {allMinistriesForCoordinator.filter(
                (m) =>
                  !coordinatorMinistries.some((c) => c.id === m.id) &&
                  m.name.toLowerCase().includes(searchCoordinatorMinistry.toLowerCase().trim())
              ).length === 0 && (
                <p className="p-3 text-sm text-gray-500">
                  {searchCoordinatorMinistry.trim()
                    ? 'Aucun ministère trouvé pour cette recherche.'
                    : 'Aucun autre ministère à assigner (le membre est déjà coordinateur partout où il est assigné).'}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleAssignCoordinatorToMinistry}
              disabled={!selectedCoordinatorMinistryId || actionLoading === 'assign-coordinator'}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 self-start"
            >
              <UserPlus className="h-4 w-4" />
              {actionLoading === 'assign-coordinator' ? 'En cours…' : 'Assigner comme coordinateur'}
            </button>
          </div>
        </section>
      )}

      {/* Rétrograder coordinateur — PASTORAL uniquement (backend) */}
      {canDemoteCoordinator && coordinatorMinistries.length > 0 && (
        <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <ShieldOff className="h-5 w-5 text-orange-600" />
            Rétrograder coordinateur
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Ce membre est coordinateur des ministères suivants. Vous pouvez le rétrograder en membre.
          </p>
          <ul className="space-y-2">
            {coordinatorMinistries.map((min) => (
              <li
                key={min.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-800">{min.name}</span>
                <button
                  type="button"
                  onClick={() => handleDemoteCoordinator(min.id)}
                  disabled={actionLoading === `demote-${min.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 text-sm"
                >
                  <ShieldOff className="h-4 w-4" />
                  {actionLoading === `demote-${min.id}` ? 'En cours…' : 'Rétrograder'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
