"use client";

import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/analyticsService";
import { QUERY_KEYS } from "@/react-query/constants";
import userManagementService from "@/services/userManagementService";

export type AdminStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "DEACTIVATED";
export type AdminType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  name: null | string;
  createdAt: Date | null;
  lastLogin: Date | null;
  status: AdminStatus;
};

export type AdminFilters = {
  search?: string;
  status?: AdminStatus;
  limit?: number;
  page?: number;
};

export type AdminResponseMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AdminResponse = {
  data?: AdminType[];
  meta?: AdminResponseMeta;
  error?: string;
};

export function useAdminList(filters: AdminFilters) {
  const query = useQuery<AdminResponse>({
    queryKey: [QUERY_KEYS.FETCH_ADMINS, filters],
    queryFn: async () => {
      const res = (await userManagementService.getAllAdmins(
        filters
      )) as AdminResponse;

      if (res.error) {
        throw new Error(res.error);
      }

      return res;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}
