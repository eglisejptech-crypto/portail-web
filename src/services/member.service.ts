import { apiClient } from './api.client';
import { ApiResponse, Member, PaginatedResponse } from '../types';

export const memberService = {
  async getAll(page = 0, size = 20): Promise<PaginatedResponse<Member>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Member>>>(
      `/members?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async getById(id: number): Promise<Member> {
    const response = await apiClient.get<ApiResponse<Member>>(`/members/${id}`);
    return response.data.data;
  },

  async getMyProfile(): Promise<Member> {
    const response = await apiClient.get<ApiResponse<Member>>('/members/me');
    return response.data.data;
  },

  async getMemberMinistries(id: number): Promise<number[]> {
    const response = await apiClient.get<number[]>(`/members/${id}/ministries`);
    return Array.isArray(response.data) ? response.data : [];
  },

  async create(member: Partial<Member>): Promise<Member> {
    const response = await apiClient.post<ApiResponse<Member>>('/members', member);
    return response.data.data;
  },

  async update(id: number, member: Partial<Member>): Promise<Member> {
    const response = await apiClient.put<ApiResponse<Member>>(`/members/${id}`, member);
    return response.data.data;
  },

  async updateRole(id: number, roleRequest: { role: string }): Promise<Member> {
    const response = await apiClient.put<ApiResponse<Member>>(`/members/${id}/role`, roleRequest);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/members/${id}`);
  },
};
