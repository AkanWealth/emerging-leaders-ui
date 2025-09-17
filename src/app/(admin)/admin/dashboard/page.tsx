"use client";

import { useUserStore } from "@/store/userStore";
import UserRankingTable from "./UserRankingTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ListFilter,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiExport } from "react-icons/ci";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
// import ChartComponent from "./ChartComponent";
import InteractiveChart from "./ChartComponent";
import UserRankingFilter from "./UserRankingFilter";
import {
  ChartPoint,
  useCardGrowth,
} from "@/hooks/admin/analytics/useCardGrowth";
// import { useUserGrowth } from "@/hooks/admin/analytics/useUserGrowth";
export type UserGrowthPeriodType = "7d" | "30d" | "12m";

const DashboardPage = () => {
  const { user } = useUserStore();
  const { data, isLoading: loading } = useCardGrowth();

  const [showFilter, setShowFilter] = useState(false);

  return (
    <main className="flex flex-col gap-[39px]">
      {/* Welcome Section */}
      <section className="flex flex-col gap-[4px]">
        <h2 className="text-[#2A2829] font-medium text-[24px]">
          Welcome back, <span className="">{user?.firstname || "Name"}</span>
        </h2>
        <p className="text-[#65605C] font-normal text-[16px]">
          Monitor analytics on users effectively.
        </p>
      </section>

      {/* Dashboard Cards */}
      <section className="flex flex-col gap-[20px]">
        <section className="grid grid-cols-3 gap-[24px]">
          {/* Total Users */}
          <aside className="bg-white border border-[#E9EAEB] rounded-[12px]">
            <h3 className="px-[20px] py-[15px] text-[#181D27] font-semibold text-[14px] leading-[20px]">
              Total users
            </h3>
            <aside className="border-t rounded-[12px] px-[20px] py-[15px]">
              <aside className="flex items-center justify-between">
                {loading ? (
                  <aside className="flex items-center gap-[8px]">
                    <Skeleton className="w-[60px] h-[32px] rounded-md" />
                    <div className="flex items-center gap-[8px]">
                      <Skeleton className="w-[40px] h-[14px] rounded-md" />
                      <Skeleton className="w-[60px] h-[14px] rounded-md" />
                    </div>
                  </aside>
                ) : (
                  <aside className="flex items-center gap-[8px]">
                    <h3 className="text-[#181D27] font-medium text-[32px]">
                      {data?.totalUsers.current?.toLocaleString()}
                    </h3>
                    <div className="flex items-center gap-[8px]">
                      <div
                        className={`flex items-center ${
                          data?.totalUsers.trend === "positive" ||
                          data?.totalUsers.trend === "neutral"
                            ? "text-[#079455]"
                            : "text-[#D92D20]"
                        }  gap-[4px] text-[14px] font-medium leading-[20px]`}
                      >
                        {data?.totalUsers.trend === "positive" ||
                        data?.totalUsers.trend === "neutral" ? (
                          <TrendingUp />
                        ) : (
                          <TrendingDown />
                        )}
                        <span>
                          {data?.totalUsers.growthPercentage?.toLocaleString()}%
                        </span>
                      </div>
                      <span className="text-[#535862] text-[14px] leading-[20px] font-medium">
                        vs last month
                      </span>
                    </div>
                  </aside>
                )}
                {/* <EllipsisVertical /> */}
              </aside>

              <aside className="mt-4 h-[60px]">
                {loading ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  <DashboardCharts
                    data={data?.charts.totalUsers as ChartPoint[]}
                    stopColor="#3DA755"
                    strokeColor="#17B26A"
                  />
                )}
              </aside>
            </aside>
          </aside>

          {/* Active Users */}
          <aside className="bg-white border border-[#E9EAEB] rounded-[12px]">
            <h3 className="px-[20px] py-[15px] text-[#181D27] font-semibold text-[14px] leading-[20px]">
              Active users
            </h3>
            <aside className="border-t rounded-[12px] px-[20px] py-[15px]">
              <aside className="flex items-center justify-between">
                {loading ? (
                  <aside className="flex items-center gap-[8px]">
                    <Skeleton className="w-[60px] h-[32px] rounded-md" />
                    <div className="flex items-center gap-[8px]">
                      <Skeleton className="w-[40px] h-[14px] rounded-md" />
                      <Skeleton className="w-[60px] h-[14px] rounded-md" />
                    </div>
                  </aside>
                ) : (
                  <aside className="flex items-center gap-[8px]">
                    <h3 className="text-[#181D27] font-medium text-[32px]">
                      {data?.activeUsers.current?.toLocaleString()}
                    </h3>

                    <div className="flex items-center gap-[8px]">
                      <div
                        className={`flex items-center ${
                          data?.activeUsers.trend === "positive" ||
                          data?.activeUsers.trend === "neutral"
                            ? "text-[#079455]"
                            : "text-[#D92D20]"
                        }  gap-[4px] text-[14px] font-medium leading-[20px]`}
                      >
                        {data?.activeUsers.trend === "positive" ||
                        data?.activeUsers.trend === "neutral" ? (
                          <TrendingUp />
                        ) : (
                          <TrendingDown />
                        )}
                        <span>
                          {data?.activeUsers.growthPercentage?.toLocaleString()}
                          %
                        </span>
                      </div>
                      <span className="text-[#535862] text-[14px] leading-[20px] font-medium">
                        vs last month
                      </span>
                    </div>
                  </aside>
                )}
                {/* <EllipsisVertical /> */}
              </aside>

              <aside className="mt-4 h-[60px]">
                {loading ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  <DashboardCharts
                    data={data?.charts.activeUsers as ChartPoint[]}
                    stopColor={
                      data?.activeUsers.trend === "positive"
                        ? "#3DA755" // green
                        : data?.activeUsers.trend === "neutral"
                        ? "#17B26A" // lighter green (or keep same green if you prefer)
                        : "#F04438" // red
                    }
                    strokeColor={
                      data?.activeUsers.trend === "positive"
                        ? "#17B26A" // bright green stroke
                        : data?.activeUsers.trend === "neutral"
                        ? "#3DA755" // softer green stroke
                        : "#F04438" // red stroke
                    }
                  />
                )}
              </aside>
            </aside>
          </aside>

          {/* New Registrations */}
          <aside className="bg-white border border-[#E9EAEB] rounded-[12px]">
            <h3 className="px-[20px] py-[15px] text-[#181D27] font-semibold text-[14px] leading-[20px]">
              New registrations
            </h3>
            <aside className="border-t rounded-[12px] px-[20px] py-[15px]">
              <aside className="flex items-center justify-between">
                {loading ? (
                  <aside className="flex items-center gap-[8px]">
                    <Skeleton className="w-[60px] h-[32px] rounded-md" />
                    <div className="flex items-center gap-[8px]">
                      <Skeleton className="w-[40px] h-[14px] rounded-md" />
                      <Skeleton className="w-[60px] h-[14px] rounded-md" />
                    </div>
                  </aside>
                ) : (
                  <aside className="flex items-center gap-[8px]">
                    <h3 className="text-[#181D27] font-medium text-[32px]">
                      {data?.newRegistrations.current?.toLocaleString()}
                    </h3>

                    <div className="flex items-center gap-[8px]">
                      <div
                        className={`flex items-center ${
                          data?.newRegistrations.trend === "positive" ||
                          data?.newRegistrations.trend === "neutral"
                            ? "text-[#079455]"
                            : "text-[#D92D20]"
                        }  gap-[4px] text-[14px] font-medium leading-[20px]`}
                      >
                        {data?.newRegistrations.trend === "positive" ||
                        data?.newRegistrations.trend === "neutral" ? (
                          <TrendingUp />
                        ) : (
                          <TrendingDown />
                        )}
                        <span>
                          {data?.newRegistrations.growthPercentage?.toLocaleString()}
                          %
                        </span>
                      </div>
                      <span className="text-[#535862] text-[14px] leading-[20px] font-medium">
                        vs last month
                      </span>
                    </div>
                  </aside>
                )}
                {/* <EllipsisVertical /> */}
              </aside>

              <aside className="mt-4 h-[60px]">
                {loading ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  // `flex items-center ${
                  //         data?.newRegistrations.trend === "positive" ||
                  //         data?.newRegistrations.trend === "neutral"
                  //           ? "text-[#079455]"
                  //           : "text-[#D92D20]"
                  //       }
                  <DashboardCharts
                    data={data?.charts.newRegistrations as ChartPoint[]}
                    stopColor={
                      data?.newRegistrations.trend === "positive"
                        ? "#3DA755" // green
                        : data?.newRegistrations.trend === "neutral"
                        ? "#17B26A" // lighter green (or keep same green if you prefer)
                        : "#F04438" // red
                    }
                    strokeColor={
                      data?.newRegistrations.trend === "positive"
                        ? "#17B26A" // bright green stroke
                        : data?.newRegistrations.trend === "neutral"
                        ? "#3DA755" // softer green stroke
                        : "#F04438" // red stroke
                    }
                  />
                )}
              </aside>
            </aside>
          </aside>
        </section>

        {/* Tabs */}
        <Tabs
          defaultValue="growth"
          className="bg-[#FFFFFF] pb-[8px] pt-[12px] rounded-[12px] shadow relative"
        >
          <aside className="flex px-[20px] items-center justify-between ">
            <TabsList className="h-[40px] w-[238px] bg-[#FAFAFA] border border-[#D5D7DA]">
              <TabsTrigger value="growth">User growth</TabsTrigger>
              <TabsTrigger value="ranking">User ranking</TabsTrigger>
            </TabsList>
            <aside>
              <TabsContent
                value="ranking"
                className="flex items-center gap-[16px]"
              >
                <div className="rounded-[12px] bg-[#F9F9F7] relative min-w-[385px] h-[48px] flex items-center justify-center py-[12px] px-[16px]">
                  <Search className="absolute left-3 text-[#928F8B] h-[19.5px] w-[19.5px]" />
                  <input
                    className="border-none outline-none pl-[40px] w-full text-[14px] text-[#928F8B]"
                    type="text"
                    placeholder="Search by user..."
                  />
                </div>
                <Button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] hover:text-[#F9F9F7] hover:bg-[#65605C] hover:shadow-2xl"
                >
                  <ListFilter className="h-[12.75px] w-[22.5px]" />
                  <span>Filter</span>
                </Button>
                <Button className="flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] hover:text-[#F9F9F7] hover:bg-[#65605C] hover:shadow-2xl">
                  <CiExport className="h-[12.75px] w-[22.5px]" />
                  <span>Download</span>
                </Button>
              </TabsContent>
            </aside>
          </aside>
          {showFilter && (
            <TabsContent
              className="absolute z-10 right-0 top-[100px] pb-[100px]"
              value="ranking"
            >
              <UserRankingFilter onClose={() => setShowFilter(false)} />
            </TabsContent>
          )}
          <aside>
            <TabsContent
              className="border-t mt-[15px] px-[20px] rounded-t-[12px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
              value="ranking"
            >
              <section className="flex items-center justify-center">
                <div className="flex items-center justify-between gap-[18px] py-9">
                  <Image
                    src="/dashboard/leaderBadge.svg"
                    alt="Leaderboard badge"
                    width={32}
                    height={32}
                  />
                  <h2 className="text-[#000000] text-[24px] font-medium">
                    Leaderboard
                  </h2>
                  <Image
                    src="/dashboard/leaderBadge.svg"
                    alt="Leaderboard badge"
                    width={32}
                    height={32}
                  />
                </div>
              </section>
              <UserRankingTable />
            </TabsContent>
            <TabsContent
              className="border-t mt-[15px] px-[20px] py-[20px] rounded-t-[12px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
              value="growth"
            >
              <InteractiveChart />
            </TabsContent>
          </aside>
        </Tabs>
      </section>
    </main>
  );
};

export default DashboardPage;

// Chart component
type DataType = { label: string; value: number }[];
type DashboardChartsProps = {
  stopColor: string;
  strokeColor: string;
  data: DataType;
};

function DashboardCharts({
  stopColor,
  strokeColor,
  data,
}: DashboardChartsProps) {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={stopColor} stopOpacity={0.2} />
            <stop offset="95%" stopColor={stopColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" hide />
        <YAxis hide />
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          fill={`url(#${gradientId})`}
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
