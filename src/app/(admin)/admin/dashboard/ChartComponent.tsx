// "use client";
// import { useUserGrowth } from "@/hooks/admin/analytics/useUserGrowth";
// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import { UserGrowthPeriodType } from "./page";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ArrowUp } from "lucide-react";
// type timePeriodsType = { key: UserGrowthPeriodType; label: string };
// const timePeriods: timePeriodsType[] = [
//   { label: "12 months", key: "12m" },
//   { label: "30 days", key: "30d" },
//   { label: "7 days", key: "7d" },
// ];

// function ChartSkeleton() {
//   return (
//     <div className="w-full h-96 bg-white rounded-lg p-4 animate-pulse">
//       {/* Simulate header/title */}
//       <div className="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>

//       {/* Simulate chart lines */}
//       <div className="relative h-full flex flex-col justify-between">
//         {/* Horizontal grid lines */}
//         <div className="h-1/4 w-full flex justify-between items-center">
//           <div className="h-0.5 w-full bg-gray-200 rounded"></div>
//         </div>
//         <div className="h-1/4 w-full flex justify-between items-center">
//           <div className="h-0.5 w-full bg-gray-200 rounded"></div>
//         </div>
//         <div className="h-1/4 w-full flex justify-between items-center">
//           <div className="h-0.5 w-full bg-gray-200 rounded"></div>
//         </div>
//         <div className="h-1/4 w-full flex justify-between items-center">
//           <div className="h-0.5 w-full bg-gray-200 rounded"></div>
//         </div>

//         {/* Simulate dots on line */}
//         <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <div key={i} className="h-3 w-3 bg-gray-300 rounded-full"></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const InteractiveChart = () => {
//   const [selectedPeriod, setSelectedPeriod] =
//     useState<UserGrowthPeriodType>("12m");

//   // Sample data matching your dashboard theme

//   const { data: userGrowthData, isLoading: isGrowthLoading } =
//     useUserGrowth(selectedPeriod);
//   const data = [
//     { month: "Jan", value: 18000, dotted: 14000 },
//     { month: "Feb", value: 18500, dotted: 14500 },
//     { month: "Mar", value: 21000, dotted: 17000 },
//     { month: "Apr", value: 20000, dotted: 16500 },
//     { month: "May", value: 22000, dotted: 18500 },
//     { month: "Jun", value: 21500, dotted: 18000 },
//     { month: "Jul", value: 22500, dotted: 19200 },
//     { month: "Aug", value: 22000, dotted: 18800 },
//     { month: "Sep", value: 32422, dotted: 28000 },
//     { month: "Oct", value: 31000, dotted: 27000 },
//     { month: "Nov", value: 33000, dotted: 29000 },
//     { month: "Dec", value: 35000, dotted: 30000 },
//   ];

//   if (isGrowthLoading) {
//     return (
//       <div className="mt-6">
//         <ChartSkeleton />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex justify-between ">
//         {isGrowthLoading ? (
//           <div className="flex flex-col gap-[12px]">
//             <Skeleton className="h-[48px] w-[120px] rounded-md" />
//             <div className="flex items-center gap-[8px]">
//               <Skeleton className="h-[20px] w-[60px] rounded-md" />
//               <Skeleton className="h-[20px] w-[100px] rounded-md" />
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-[12px]">
//             <h3 className="text-[#181D27] font-medium text-[32px] leading-[48px]">
//               {userGrowthData?.totalUsers?.toLocaleString() ?? 0}
//             </h3>
//             <div className="flex items-center gap-[8px]">
//               <p
//                 className={`flex items-center font-medium gap-0.5 ${
//                   userGrowthData?.trend === "positive"
//                     ? "text-[#079455]"
//                     : "text-[#E81313]"
//                 }`}
//               >
//                 <ArrowUp className="h-[16px] w-[16px]" />
//                 <span className="text-[14px] leading-[20px]">
//                   {userGrowthData?.growthPercentage ?? 0}%
//                 </span>
//               </p>
//               <p className="text-[#535862] leading-[20px] text-[14px] font-medium">
//                 vs last{" "}
//                 <span>
//                   {timePeriods.find((p) => p.key === selectedPeriod)?.label}
//                 </span>
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="">
//           <div className="flex items-center gap-1 p-1 bg-[#FAFAFA] border border-[#E9EAEB] rounded-lg ">
//             {timePeriods.map((period) => (
//               <button
//                 key={period.key}
//                 onClick={() => setSelectedPeriod(period.key)}
//                 className={`px-4 py-2 rounded-[8px] text-[14px] leading-[20px]  transition-all cursor-pointer duration-200 ${
//                   selectedPeriod === period.key
//                     ? "bg-white text-[#414651] font-semibold shadow-sm"
//                     : "text-[#717680]  font-medium hover:bg-gray-50"
//                 }`}
//               >
//                 {period.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mt-6">
//         <div className="w-full h-96 bg-white rounded-lg">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={data}
//               margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
//             >
//               <CartesianGrid
//                 strokeDasharray="none"
//                 stroke="#E9EAEB"
//                 horizontal={true}
//                 vertical={false}
//                 strokeWidth={1}
//               />
//               <XAxis
//                 dataKey="month"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fontSize: 12, fill: "#535862" }}
//                 dy={10}
//               />
//               <YAxis hide />
//               <Tooltip
//                 content={<CustomTooltip />}
//                 cursor={false}
//                 wrapperStyle={{ outline: "none" }}
//               />

//               {/* Dotted reference line */}
//               <Line
//                 type="monotone"
//                 dataKey="dotted"
//                 stroke="#928F8B"
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 dot={false}
//                 activeDot={false}
//               />

//               {/* Main growth line */}
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#A2185A"
//                 strokeWidth={3}
//                 dot={<CustomDot />}
//                 activeDot={{
//                   r: 6,
//                   stroke: "#A2185A",
//                   strokeWidth: 2,
//                   fill: "white",
//                 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InteractiveChart;

// const CustomTooltip = ({
//   active,
//   payload,
// }: {
//   active?: boolean;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   payload?: Array<any>;
//   label?: string;
// }) => {
//   if (active && payload && payload.length) {
//     const mainValue = payload.find((p) => p.dataKey === "value");
//     if (mainValue) {
//       const data = mainValue.payload;
//       return (
//         <div className="bg-[#181D27] text-white p-3 rounded-lg shadow-lg text-sm border-none">
//           <div className="font-semibold text-base">
//             {mainValue.value.toLocaleString()}
//           </div>
//           {data.isHighlighted && (
//             <div className="text-gray-300 text-xs mt-1">Sep 15, 2025</div>
//           )}
//         </div>
//       );
//     }
//   }
//   return null;
// };

// import type { DotProps } from "recharts";

// interface ChartData {
//   month: string;
//   value: number;
//   dotted: number;
//   isHighlighted?: boolean;
// }

// const CustomDot = (props: DotProps & { data?: ChartData }) => {
//   const { cx, cy, data } = props;
//   if (data && data.isHighlighted) {
//     return (
//       <>
//         <circle
//           cx={cx}
//           cy={cy}
//           r={4}
//           fill="#079455"
//           stroke="white"
//           strokeWidth={2}
//         />
//         <circle
//           cx={cx}
//           cy={cy}
//           r={8}
//           fill="none"
//           stroke="#079455"
//           strokeWidth={1}
//           opacity={0.3}
//         />
//       </>
//     );
//   }
//   return null;
// };

"use client";
import { useUserGrowth } from "@/hooks/admin/analytics/useUserGrowth";
import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { UserGrowthPeriodType } from "./page";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp } from "lucide-react";

type timePeriodsType = { key: UserGrowthPeriodType; label: string };
const timePeriods: timePeriodsType[] = [
  { label: "12 months", key: "12m" },
  { label: "30 days", key: "30d" },
  { label: "7 days", key: "7d" },
];

function ChartSkeleton() {
  return (
    <div className="w-full h-96 bg-white rounded-lg p-4 animate-pulse">
      {/* Simulate header/title */}
      <div className="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>

      {/* Simulate chart lines */}
      <div className="relative h-full flex flex-col justify-between">
        {/* Horizontal grid lines */}
        <div className="h-1/4 w-full flex justify-between items-center">
          <div className="h-0.5 w-full bg-gray-200 rounded"></div>
        </div>
        <div className="h-1/4 w-full flex justify-between items-center">
          <div className="h-0.5 w-full bg-gray-200 rounded"></div>
        </div>
        <div className="h-1/4 w-full flex justify-between items-center">
          <div className="h-0.5 w-full bg-gray-200 rounded"></div>
        </div>
        <div className="h-1/4 w-full flex justify-between items-center">
          <div className="h-0.5 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Simulate dots on line */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

const InteractiveChart = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<UserGrowthPeriodType>("12m");

  const { data: userGrowthData, isLoading: isGrowthLoading } =
    useUserGrowth(selectedPeriod);

  // Transform the API data to match the chart format
  const chartData = useMemo(() => {
    if (!userGrowthData?.data || !userGrowthData?.previousData) {
      return [];
    }

    // Create a map of previous data for easy lookup
    const previousDataMap = new Map();
    userGrowthData.previousData.forEach((item) => {
      // Remove "Prev " prefix to match with current data labels
      const cleanLabel = item.label.replace("Prev ", "");
      previousDataMap.set(cleanLabel, item.count);
    });

    // Transform current data and merge with previous data
    return userGrowthData.data.map((item) => ({
      month: item.label,
      value: item.count,
      dotted: previousDataMap.get(item.label) || 0,
      isHighlighted: false, // You can add logic here to highlight specific points
    }));
  }, [userGrowthData]);

  if (isGrowthLoading) {
    return (
      <div className="mt-6">
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between ">
        {isGrowthLoading ? (
          <div className="flex flex-col gap-[12px]">
            <Skeleton className="h-[48px] w-[120px] rounded-md" />
            <div className="flex items-center gap-[8px]">
              <Skeleton className="h-[20px] w-[60px] rounded-md" />
              <Skeleton className="h-[20px] w-[100px] rounded-md" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[12px]">
            <h3 className="text-[#181D27] font-medium text-[32px] leading-[48px]">
              {userGrowthData?.totalUsers?.toLocaleString() ?? 0}
            </h3>
            <div className="flex items-center gap-[8px]">
              <p
                className={`flex items-center font-medium gap-0.5 ${
                  userGrowthData?.trend === "positive"
                    ? "text-[#079455]"
                    : "text-[#E81313]"
                }`}
              >
                <ArrowUp className="h-[16px] w-[16px]" />
                <span className="text-[14px] leading-[20px]">
                  {userGrowthData?.growthPercentage ?? 0}%
                </span>
              </p>
              <p className="text-[#535862] leading-[20px] text-[14px] font-medium">
                vs last{" "}
                <span>
                  {timePeriods.find((p) => p.key === selectedPeriod)?.label}
                </span>
              </p>
            </div>
          </div>
        )}

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
      <div className="mt-6">
        <div className="w-full h-96 bg-white rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid
                strokeDasharray="none"
                stroke="#E9EAEB"
                horizontal={true}
                vertical={false}
                strokeWidth={1}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#535862" }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                wrapperStyle={{ outline: "none" }}
              />

              {/* Dotted reference line */}
              <Line
                type="monotone"
                dataKey="dotted"
                stroke="#928F8B"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
              />

              {/* Main growth line */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#A2185A"
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{
                  r: 6,
                  stroke: "#A2185A",
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default InteractiveChart;

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: Array<any>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const mainValue = payload.find((p) => p.dataKey === "value");
    if (mainValue) {
      const data = mainValue.payload;
      return (
        <div className="bg-[#181D27] text-white p-3 rounded-lg shadow-lg text-sm border-none">
          <div className="font-semibold text-base">
            {mainValue.value.toLocaleString()}
          </div>
          {data.isHighlighted && (
            <div className="text-gray-300 text-xs mt-1">Sep 15, 2025</div>
          )}
        </div>
      );
    }
  }
  return null;
};

import type { DotProps } from "recharts";

interface ChartData {
  month: string;
  value: number;
  dotted: number;
  isHighlighted?: boolean;
}

const CustomDot = (props: DotProps & { data?: ChartData }) => {
  const { cx, cy, data } = props;
  if (data && data.isHighlighted) {
    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="#079455"
          stroke="white"
          strokeWidth={2}
        />
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill="none"
          stroke="#079455"
          strokeWidth={1}
          opacity={0.3}
        />
      </>
    );
  }
  return null;
};