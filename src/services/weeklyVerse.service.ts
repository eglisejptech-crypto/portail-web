import { apiClient } from './api.client';
import { ApiResponse, PaginatedResponse, WeeklyVerse } from '../types';

/**
 * Service versets hebdomadaires.
 * Note: Les endpoints backend pour les versets hebdomadaires ne sont pas encore disponibles.
 * Quand le backend exposera /api/v1/weekly-verses (ou similaire), ce service pourra être adapté.
 */
const emptyVersePage = (): PaginatedResponse<WeeklyVerse> => ({
  data: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
  pageSize: 20,
});

export const weeklyVerseService = {
  async getAll(page = 0, size = 20): Promise<PaginatedResponse<WeeklyVerse>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<WeeklyVerse>>>(
        `/weekly-verses?page=${page}&size=${size}`
      );
      return response.data.data;
    } catch {
      return emptyVersePage();
    }
  },

  async getById(id: string): Promise<WeeklyVerse | null> {
    try {
      const response = await apiClient.get<ApiResponse<WeeklyVerse>>(`/weekly-verses/${id}`);
      return response.data.data;
    } catch {
      return null;
    }
  },

  async create(verse: Partial<WeeklyVerse>): Promise<WeeklyVerse | null> {
    try {
      const response = await apiClient.post<ApiResponse<WeeklyVerse>>('/weekly-verses', verse);
      return response.data.data;
    } catch {
      return null;
    }
  },

  async update(id: string, verse: Partial<WeeklyVerse>): Promise<WeeklyVerse | null> {
    try {
      const response = await apiClient.put<ApiResponse<WeeklyVerse>>(
        `/weekly-verses/${id}`,
        verse
      );
      return response.data.data;
    } catch {
      return null;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/weekly-verses/${id}`);
    } catch {
      // endpoint non disponible
    }
  },
};
