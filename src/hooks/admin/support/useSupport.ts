"use client";

import { useQuery } from "@tanstack/react-query";
import supportService from "@/services/supportService";
import { QUERY_KEYS } from "@/react-query/constants";
import { TicketStatus } from "@/app/(admin)/admin/support/SupportFilter";

export type supportType = {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  userId: string;
  userName: string;
  createdAt: string;
};

export type SupportTicketFilters = {
  search?: string;
  status?: TicketStatus;
  limit?: number;
  page?: number;
};

export type SupportTicket = {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  userId: string;
  userName: string;
  createdAt: string;
};

export type SupportTicketMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SupportTicketResponse = {
  data: SupportTicket[];
  stats: {
    resolved: number;
    inProgress: number;
    pending: number;
  };
  meta: SupportTicketMeta;
  error?: string;
};

export function useSupport(filters: SupportTicketFilters) {
  const query = useQuery<SupportTicketResponse>({
    queryKey: [QUERY_KEYS.SUPPORT_TICKETS, filters],
    queryFn: async () => {
      const res = (await supportService.getSupportTicket(
        filters
      )) as SupportTicketResponse;

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
