import { QUERY_KEYS } from "@/react-query/constants";
import assessmentService from "@/services/assessmentService";
import { useQuery } from "@tanstack/react-query";

export type AssessmentListFilters = {
  search?: string;
  year?: number;
  limit?: number;
  page?: number;
};

export type AssessmentListType = {
  id: string;
  title: string;
  category: string;
  scheduledMonth: string;
  scheduledYear: number;
  totalUsers: number;
  filledUsers: number;
  notFilledUsers: number;
  completionRate: string;
  createdAt: string | Date;
};

export type AssessmentListMeta = {
  year: number;
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
};

export type AssessmentListResponse = {
  data: AssessmentListType[];
  meta: AssessmentListMeta;
  error?: string;
};

export function useAssessmentList(filters: AssessmentListFilters) {
  const query = useQuery<AssessmentListResponse>({
    queryKey: [QUERY_KEYS.ASSESSMENT_LIST, filters],
    queryFn: async () => {
      const res = (await assessmentService.getAssessmentList(
        filters
      )) as AssessmentListResponse;

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
