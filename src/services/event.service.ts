import { apiClient } from './api.client';
import { ApiResponse, Event, PaginatedResponse } from '../types';

/**
 * Service événements.
 * Note: Les endpoints backend pour les événements ne sont pas encore disponibles.
 * Quand le backend exposera /api/v1/events, ce service fonctionnera sans modification.
 */
const emptyEventPage = (): PaginatedResponse<Event> => ({
  data: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
  pageSize: 20,
});

export const eventService = {
  async getAll(page = 0, size = 20): Promise<PaginatedResponse<Event>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Event>>>(
        `/events?page=${page}&size=${size}`
      );
      return response.data.data;
    } catch {
      return emptyEventPage();
    }
  },

  async getById(id: string): Promise<Event | null> {
    try {
      const response = await apiClient.get<ApiResponse<Event>>(`/events/${id}`);
      return response.data.data;
    } catch {
      return null;
    }
  },

  async create(event: Partial<Event>): Promise<Event | null> {
    try {
      const response = await apiClient.post<ApiResponse<Event>>('/events', event);
      return response.data.data;
    } catch {
      return null;
    }
  },

  async update(id: string, event: Partial<Event>): Promise<Event | null> {
    try {
      const response = await apiClient.put<ApiResponse<Event>>(`/events/${id}`, event);
      return response.data.data;
    } catch {
      return null;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/events/${id}`);
    } catch {
      // endpoint non disponible
    }
  },
};
