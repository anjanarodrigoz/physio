import api from './api';
import type { Physiotherapist, SearchFilters } from '@/types';

export interface RegisterPhysioData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  slmcNumber: string;
  qualifications?: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
  specializations?: string[];
  experience: number;
  bio?: string;
  address: {
    street?: string;
    city: string;
    district: string;
    province?: string;
    postalCode?: string;
  };
  servicePackages?: Array<{
    tier: 'basic' | 'standard' | 'premium';
    name: string;
    description: string;
    serviceType: 'home_visit' | 'online_consultation' | 'both';
    price: number;
    duration: number;
    features: string[];
  }>;
  languages?: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export const physiotherapistService = {
  // Register new physiotherapist
  register: async (data: RegisterPhysioData) => {
    const response = await api.post('/physiotherapists/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Login physiotherapist
  login: async (data: LoginData) => {
    const response = await api.post('/physiotherapists/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Get all physiotherapists with filters
  getAll: async (filters?: SearchFilters & { page?: number; limit?: number }) => {
    const params = new URLSearchParams();

    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.location) params.append('city', filters.location);
    if (filters?.district) params.append('district', filters.district);
    if (filters?.specialization && filters.specialization.length > 0) {
      params.append('specialization', filters.specialization[0]);
    }
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.minRating) params.append('minRating', filters.minRating.toString());

    const response = await api.get(`/physiotherapists?${params.toString()}`);
    return response.data;
  },

  // Get physiotherapist by ID
  getById: async (id: string) => {
    const response = await api.get(`/physiotherapists/${id}`);
    return response.data;
  },

  // Update physiotherapist profile
  update: async (id: string, data: Partial<Physiotherapist>) => {
    const response = await api.put(`/physiotherapists/${id}`, data);
    return response.data;
  },

  // Get districts for filters
  getDistricts: async () => {
    const response = await api.get('/physiotherapists/districts');
    return response.data;
  },

  // Get specializations for filters
  getSpecializations: async () => {
    const response = await api.get('/physiotherapists/specializations');
    return response.data;
  },
};
