"use client";

import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/analyticsService";
import { QUERY_KEYS } from "@/react-query/constants";

type TrendType = "positive" | "negative" | "neutral";

type Metric = {
  current: number;
  previous: number;
  growth: number;
  growthPercentage: number;
  trend: TrendType;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type UserAnalyticsResponse = {
  totalUsers: Metric;
  activeUsers: Metric;
  newRegistrations: Metric;
  charts: {
    newRegistrations: ChartPoint[];
    activeUsers: ChartPoint[];
    totalUsers: ChartPoint[];
  };
  error?: string;
};

export function useCardGrowth() {
  const query = useQuery<UserAnalyticsResponse>({
    queryKey: [QUERY_KEYS.USER_CARDS],
    queryFn: async () => {
      const res =
        (await analyticsService.getGrowthRecords()) as UserAnalyticsResponse;

      if (res.error) {
        throw new Error(res.error);
      }

      return res;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
