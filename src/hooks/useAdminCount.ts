"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { QUERY_KEYS } from "@/react-query/constants";
import authService from "@/services/authServices";

type AdminCountResponse = {
  totalAdmins?: number;
  error?: string;
};

export function useAdminCount() {
  const [loading, setLoading] = useState(false);

  const query = useQuery<number>({
    queryKey: QUERY_KEYS.ADMIN_COUNT,
    queryFn: async () => {
      setLoading(true);
      try {
        // first attempt
        let res = (await authService.getAdminCount()) as AdminCountResponse;

        // if error, retry once
        if (res.error) {
          res = (await authService.getAdminCount()) as AdminCountResponse;
        }

        if (res.error) {
          throw new Error(res.error);
        }

        return res.totalAdmins ?? 0;
      } finally {
        setLoading(false);
      }
    },
    retry: false, // we handle retry manually
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });

  return {
    ...query,
    loading,
  };
}
