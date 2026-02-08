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

/** Membre (MemberDto backend) - utilisé par l'API members */
export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  gender?: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
  roles: string[];
  imageUrl?: string | null;
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

/** Famille d'impact (ImpactFamilyDto backend) */
export interface FamilleImpact {
  id: number;
  name: string;
  address?: string;
  description?: string;
  memberCount: number;
  userIds?: number[];
  users?: Member[];
  createdAt: string;
  updatedAt: string;
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
