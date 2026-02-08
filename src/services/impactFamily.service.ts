import { apiClient } from './api.client';
import { ApiResponse, FamilleImpact, Member, PaginatedResponse } from '../types';

export const impactFamilyService = {
  async getAll(page = 0, size = 20): Promise<PaginatedResponse<FamilleImpact>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<FamilleImpact>>>(
      `/impact-families?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async getById(id: number): Promise<FamilleImpact> {
    const response = await apiClient.get<ApiResponse<FamilleImpact>>(`/impact-families/${id}`);
    return response.data.data;
  },

  async create(famille: Partial<FamilleImpact>): Promise<FamilleImpact> {
    const response = await apiClient.post<ApiResponse<FamilleImpact>>('/impact-families', famille);
    return response.data.data;
  },

  async update(id: number, famille: Partial<FamilleImpact>): Promise<FamilleImpact> {
    const response = await apiClient.put<ApiResponse<FamilleImpact>>(
      `/impact-families/${id}`,
      famille
    );
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/impact-families/${id}`);
  },

  async getMembersByImpactFamily(
    id: number,
    page = 0,
    size = 20
  ): Promise<PaginatedResponse<Member>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Member>>>(
      `/impact-families/${id}/users?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async getPilotsByImpactFamily(
    id: number,
    page = 0,
    size = 20
  ): Promise<PaginatedResponse<Member>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Member>>>(
      `/impact-families/${id}/pilots?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async assignMemberToImpactFamily(familyId: number, userId: number): Promise<void> {
    await apiClient.post(`/impact-families/${familyId}/users/${userId}`);
  },

  async removeMemberFromImpactFamily(familyId: number, userId: number): Promise<void> {
    await apiClient.delete(`/impact-families/${familyId}/users/${userId}`);
  },

  async unassignMemberFromImpactFamily(userId: number): Promise<void> {
    await apiClient.delete(`/impact-families/users/${userId}`);
  },

  async assignPilotToImpactFamily(familyId: number, userId: number): Promise<Member> {
    const response = await apiClient.post<ApiResponse<Member>>(
      `/impact-families/${familyId}/pilots/${userId}`
    );
    return response.data.data;
  },

  async removePilotFromImpactFamily(familyId: number, userId: number): Promise<void> {
    await apiClient.delete(`/impact-families/${familyId}/pilots/${userId}`);
  },

  /**
   * Trouve la famille d'impact à laquelle appartient un membre (aucun endpoint dédié backend).
   */
  async findFamilyByMemberId(memberId: number): Promise<FamilleImpact | null> {
    let page = 0;
    const size = 50;
    for (;;) {
      const response = await this.getAll(page, size);
      const found = response.data.find(
        (f) => f.userIds && f.userIds.includes(memberId)
      );
      if (found) return found;
      if (page >= response.totalPages - 1) break;
      page += 1;
    }
    return null;
  },
};
