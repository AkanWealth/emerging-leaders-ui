"use client";

import { useQuery } from "@tanstack/react-query";
import adminService from "@/services/adminService";
import { useUserStore } from "@/store/userStore";
import { AdminUserType } from "@/types/AdminUserType";
import { QUERY_KEYS } from "@/react-query/constants";

export function useAdminUser() {
  const { setUser, clearUser, setLoading } = useUserStore();

  return useQuery<AdminUserType>({
    queryKey: QUERY_KEYS.ADMIN_USER,
    queryFn: async () => {
      setLoading(true);
      try {
        const data = (await adminService.getUser()) as AdminUserType;
        setUser(data);
        return data;
      } catch (err) {
        clearUser();
        throw err;
      } finally {
        setLoading(false);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });
}
