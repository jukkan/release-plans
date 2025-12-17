import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

/**
 * Custom hook for fetching releases
 * @param {Object} filters - Filter parameters
 * @returns {Object} Query result with releases data
 */
export function useReleases(filters = {}) {
  return useQuery({
    queryKey: ['releases', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.productName) params.append('productName', filters.productName);
      if (filters.investmentArea) params.append('investmentArea', filters.investmentArea);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const response = await api.get(`/releases?${params.toString()}`);
      return response.data;
    },
  });
}

/**
 * Custom hook for fetching a single release
 * @param {string} id - Release ID
 * @returns {Object} Query result with release data
 */
export function useRelease(id) {
  return useQuery({
    queryKey: ['release', id],
    queryFn: async () => {
      const response = await api.get(`/releases/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Custom hook for syncing releases
 * @returns {Object} Mutation object for triggering sync
 */
export function useSyncReleases() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/admin/releases/sync');
      return response.data;
    },
    onSuccess: () => {
      // Invalidate releases cache to refetch
      queryClient.invalidateQueries({ queryKey: ['releases'] });
    },
  });
}
