"use client";

import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/analyticsService";
import { QUERY_KEYS } from "@/react-query/constants";
import { UserGrowthPeriodType } from "@/app/(admin)/admin/dashboard/page";

type GrowthDataPoint = {
  label: string;
  count: number;
};

type UserGrowthResponse = {
  period: string;
  totalUsers: number;
  previousTotal: number;
  growth: number;
  growthPercentage: number;
  trend: "positive" | "negative" | "neutral";
  data: GrowthDataPoint[];
  previousData: GrowthDataPoint[];
  error?: string;
};

export function useUserGrowth(period: UserGrowthPeriodType = "30d") {
  const query = useQuery<UserGrowthResponse>({
    queryKey: [QUERY_KEYS.USER_GROWTH, period],
    queryFn: async () => {
      const res = (await analyticsService.getUserGrowth(
        period
      )) as UserGrowthResponse;

      if (res.error) {
        throw new Error(res.error);
      }

      return res;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
