"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  LeaderboardMeta,
  LeaderboardType,
} from "@/hooks/admin/analytics/useLeaderboard";
type FilterState = {
  ranking?: string;
  completed?: string;
  goals?: string;
  streak?: string;
};

type UserRankingTableProps = {
  loading: boolean;
  data: LeaderboardType[];
  search: string;
  currentFilters: FilterState;
  meta: LeaderboardMeta;
};

const UserRankingTable = ({
  loading,
  data: leaderboard,
  search,
  currentFilters,
  meta,
}: UserRankingTableProps) => {
  return (
    <section>
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <colgroup>
            <col style={{ width: "12.5%" }} /> {/* Ranking */}
            <col style={{ width: "25%" }} /> {/* Name */}
            <col style={{ width: "12.5%" }} /> {/* Projects */}
            <col style={{ width: "12.5%" }} /> {/* Goals */}
            <col style={{ width: "12.5%" }} /> {/* Savings */}
            <col style={{ width: "12.5%" }} /> {/* Budget */}
            <col style={{ width: "12.5%" }} /> {/* Streak */}
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead className="whitespace-nowrap">Ranking</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Projects
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Goals
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Savings
              </TableHead>
              <TableHead className="whitespace-nowrap text-center">
                Budget
              </TableHead>
              <TableHead className="whitespace-nowrap text-right">
                Streak
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              // show skeleton while loading
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i} className="h-[60px]">
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-10 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-10 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-10 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-10 mx-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : leaderboard?.length === 0 ? (
              // no data at all
              search === "" &&
              currentFilters.completed === "" &&
              currentFilters.goals === "" &&
              currentFilters.ranking === "" &&
              currentFilters.streak === "" ? (
                <EmptyTable />
              ) : (
                <NotFound />
              )
            ) : (
              // <EmptyTable />
              // render actual leaderboard
              leaderboard.map((item, index) => {
                const serialNumber = (meta.page - 1) * meta.limit + (index + 1);
                return (
                  <TableRow className="h-[60px]" key={index}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {serialNumber}
                    </TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <span className="block truncate">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.projects.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.goals.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.savings.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.budget.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {item.streak} {item.streak > 1 ? "days" : "day"}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default UserRankingTable;

function EmptyTable() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-10">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/dashboard/EmptyLeaderBoard.svg"
            alt="Empty Table"
            width={290}
            height={290}
          />
          <aside className="flex flex-col gap-2">
            <h3 className="font-medium text-[#2A2829] text-[20px] leading-[30px]">
              Nothing to display right now
            </h3>
            <p className="text-[#2A2829] font-normal text-[16px] leading-[24px]">
              Data will show up here as soon as it&apos;s available.
            </p>
          </aside>
        </div>
      </TableCell>
    </TableRow>
  );
}

function NotFound() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-10">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/dashboard/NotFound.svg"
            alt="Empty Table"
            width={290}
            height={290}
          />
          <aside className="flex flex-col gap-2">
            <h3 className="font-medium text-[#2A2829] text-[20px] leading-[30px]">
              Result Not Found
            </h3>
          </aside>
        </div>
      </TableCell>
    </TableRow>
  );
}
