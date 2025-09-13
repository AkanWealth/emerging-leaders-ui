"use client";

import { useUserStore } from "@/store/userStore";
import UserRankingTable from "./UserRankingTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

import {
  ArrowUp,
  EllipsisVertical,
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

const chartTotalData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 60 },
  { name: "Apr", value: 58 },
  { name: "May", value: 70 },
  { name: "Jun", value: 80 },
  { name: "Jul", value: 72 },
];

const chartActiveData = [
  { name: "Jan", value: 80 },
  { name: "Feb", value: 72 },
  { name: "Mar", value: 65 },
  { name: "Apr", value: 58 },
  { name: "May", value: 50 },
  { name: "Jun", value: 45 },
  { name: "Jul", value: 40 },
];

const DashboardPage = () => {
  const { user } = useUserStore();
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("12months");
  const timePeriods = [
    { key: "12months", label: "12 months" },
    { key: "30days", label: "30 days" },
    { key: "7days", label: "7 days" },
  ];

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col gap-[39px]">
      {/* Welcome Section */}
      <section className="flex flex-col gap-[4px]">
        <h2 className="text-[#2A2829] font-medium text-[24px]">
          Welcome back,{" "}
          <span className="">{user?.name.trim().split(/\s+/)[0]}</span>
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
                      2,420
                    </h3>
                    <div className="flex items-center gap-[8px]">
                      <div className="flex items-center text-[#079455] gap-[4px] text-[14px] font-medium leading-[20px]">
                        <TrendingUp />
                        <span>40%</span>
                      </div>
                      <span className="text-[#535862] text-[14px] leading-[20px] font-medium">
                        vs last month
                      </span>
                    </div>
                  </aside>
                )}
                <EllipsisVertical />
              </aside>

              <aside className="mt-4 h-[60px]">
                {loading ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  <DashboardCharts
                    data={chartTotalData}
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
                      1,210
                    </h3>
                    <div className="flex items-center gap-[8px]">
                      <div className="flex items-center text-[#D92D20] gap-[4px] text-[14px] font-medium leading-[20px]">
                        <TrendingDown />
                        <span>10%</span>
                      </div>
                      <span className="text-[#535862] text-[14px] leading-[20px] font-medium">
                        vs last month
                      </span>
                    </div>
                  </aside>
                )}
                <EllipsisVertical />
              </aside>

              <aside className="mt-4 h-[60px]">
                {loading ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  <DashboardCharts
                    data={chartActiveData}
                    stopColor="#F04438"
                    strokeColor="#F04438"
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
                      316
                    </h3>
                    <div className="flex items-center gap-[8px]">
                      <div className="flex items-center text-[#079455] gap-[4px] text-[14px] font-medium leading-[20px]">
                        <TrendingUp />
                        <span>20%</span>
                      </div>
                      <span className="text-[#535862] text-[14px] leading-[20px] font-medium">
                        vs last month
                      </span>
                    </div>
                  </aside>
                )}
                <EllipsisVertical />
              </aside>

              <aside className="mt-4 h-[60px]">
                {loading ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  <DashboardCharts
                    data={chartTotalData}
                    stopColor="#3DA755"
                    strokeColor="#17B26A"
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
              <div className="flex justify-between ">
                <div className="flex flex-col gap-[12px]">
                  <h3 className="text-[#181D27] font-medium text-[32px] leading-[48px]">
                    32,422
                  </h3>
                  <div className="flex items-center gap-[8px]">
                    <p className="flex items-center font-medium gap-0.5 text-[#079455]">
                      <ArrowUp className="h-[16px] w-[16px]" />
                      <span className="text-[14px] leading-[20px]">3.2%</span>
                    </p>
                    <p className="text-[#535862] leading-[20px] text-[14px] font-medium">
                      vs last{" "}
                      <span className="">
                        {
                          timePeriods.find((p) => p.key === selectedPeriod)
                            ?.label
                        }
                      </span>
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center gap-1 p-1 bg-[#FAFAFA] border border-[#E9EAEB] rounded-lg ">
                    {timePeriods.map((period) => (
                      <button
                        key={period.key}
                        onClick={() => setSelectedPeriod(period.key)}
                        className={`px-4 py-2 rounded-[8px] text-[14px] leading-[20px]  transition-all cursor-pointer duration-200 ${
                          selectedPeriod === period.key
                            ? "bg-white text-[#414651] font-semibold shadow-sm"
                            : "text-[#717680]  font-medium hover:bg-gray-50"
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
type DataType = { name: string; value: number }[];
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
        <XAxis dataKey="name" hide />
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
