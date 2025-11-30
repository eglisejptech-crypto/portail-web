import { apiClient } from './api.client';
import { ApiResponse, Ministry, PaginatedResponse } from '../types';

export const ministryService = {
  async getAll(page = 0, size = 20): Promise<PaginatedResponse<Ministry>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Ministry>>>(
      `/ministries?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  async getById(id: number): Promise<Ministry> {
    const response = await apiClient.get<ApiResponse<Ministry>>(`/ministries/${id}`);
    return response.data.data;
  },

  async create(ministry: Partial<Ministry>): Promise<Ministry> {
    const response = await apiClient.post<ApiResponse<Ministry>>('/ministries', ministry);
    return response.data.data;
  },

  async update(id: number, ministry: Partial<Ministry>): Promise<Ministry> {
    const response = await apiClient.put<ApiResponse<Ministry>>(`/ministries/${id}`, ministry);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/ministries/${id}`);
  }
};
