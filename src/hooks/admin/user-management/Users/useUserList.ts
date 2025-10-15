"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/constants";
import userManagementService from "@/services/userManagementService";

export type AdminStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "DEACTIVATED";

export type UserType = {
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

export type UserResponse = {
  data?: UserType[];
  meta?: AdminResponseMeta;
  error?: string;
};

export function useUserList(filters: AdminFilters) {
  const query = useQuery<UserResponse>({
    queryKey: [QUERY_KEYS.FETCH_USERS, filters],
    queryFn: async () => {
      const res = (await userManagementService.getAllUsers(
        filters
      )) as UserResponse;

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
