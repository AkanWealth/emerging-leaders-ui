import { QUERY_KEYS } from "@/react-query/constants";
import assessmentService from "@/services/assessmentService";
import { useQuery } from "@tanstack/react-query";

export type UserReportFilters = {
  search?: string;
  year?: number;
  limit?: number;
  page?: number;
};

export type UserReportType = {
  userId: string;
  fullname: string;
  profilePicture: null | string;
  January: string;
  February: string;
  March: string;
  April: string;
  May: string;
  June: string;
  July: string;
  August: string;
  September: string;
  October: string;
  November: string;
  December: string;
};

export type UserReportMeta = {
  year: number;
  totalUsers: number;
  currentPage: number;
  limit: number;
  totalPages: number;
};

export type UserReportResponse = {
  data: UserReportType[];
  meta: UserReportMeta;
  error?: string;
};

export function useReport(filters: UserReportFilters) {
  const query = useQuery<UserReportResponse>({
    queryKey: [QUERY_KEYS.USER_REPORT, filters],
    queryFn: async () => {
      const res = (await assessmentService.getUserReport(
        filters
      )) as UserReportResponse;

      if (res.error) {
        throw new Error(res.error);
      }

      return res;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 3000, // 3 seconds
  });

  return query;
}
