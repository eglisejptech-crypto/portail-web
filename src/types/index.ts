export interface ApiResponse<T> {
  success: boolean;
  statusCode: {
    code: number;
    description: string;
  };
  data: T;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  exp: number;
  roles: string[];
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  ministryIds: number[];
  coordinatorMinistryIds: number[];
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  ministryIds?: number[];
  coordinatorMinistryIds?: number[];
  createdAt?: string;
}

export interface Ministry {
  id: number;
  name: string;
  description: string;
  coordinatorIds: number[];
  memberCount: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

export interface FamilleImpact {
  id: string;
  name: string;
  leaderId?: string;
  members: string[];
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdAt: string;
}

export interface WeeklyVerse {
  id: string;
  reference: string;
  text: string;
  weekStartDate: string;
  createdAt: string;
}
