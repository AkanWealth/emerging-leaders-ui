"use client";

import { useQuery } from "@tanstack/react-query";
import analyticsService from "@/services/analyticsService";
import { QUERY_KEYS } from "@/react-query/constants";

export type LeaderboardFilters = {
  search?: string;
  ranking?: "highest" | "lowest";
  completed?: string; // e.g., "0-20"
  goals?: string; // e.g., "101-300"
  streak?: string; // e.g., "21-50"
  limit?: number;
  page?: number;
};

export type LeaderboardType = {
  id: string;
  name: string;
  projects: number;
  completed: number;
  goals: number;
  savings: number;
  budget: number;
  streak: number;
};

export type LeaderboardMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  sortedBy: string;
  ranking: "highest" | "lowest";
};

export type LeaderboardResponse = {
  data: LeaderboardType[];
  meta: LeaderboardMeta;
  error?: string;
};

export function useLeaderboard(filters: LeaderboardFilters) {
  const query = useQuery<LeaderboardResponse>({
    queryKey: [QUERY_KEYS.ANALYTICS_LEADERBOARD, filters],
    queryFn: async () => {
      const res = (await analyticsService.getLeaderBoardData(
        filters
      )) as LeaderboardResponse;

      if (res.error) {
        throw new Error(res.error);
      }

      return res;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}
