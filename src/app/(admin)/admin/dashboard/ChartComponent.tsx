import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);

  // Sample data matching your dashboard theme
  const data = [
    { month: "Jan", value: 18000, dotted: 14000 },
    { month: "Feb", value: 18500, dotted: 14500 },
    { month: "Mar", value: 21000, dotted: 17000 },
    { month: "Apr", value: 20000, dotted: 16500 },
    { month: "May", value: 22000, dotted: 18500 },
    { month: "Jun", value: 21500, dotted: 18000 },
    { month: "Jul", value: 22500, dotted: 19200 },
    { month: "Aug", value: 22000, dotted: 18800 },
    { month: "Sep", value: 32422, dotted: 28000 },
    { month: "Oct", value: 31000, dotted: 27000 },
    { month: "Nov", value: 33000, dotted: 29000 },
    { month: "Dec", value: 35000, dotted: 30000 },
  ];

  useEffect(() => {
    // Simulate loading time to match your dashboard
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
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

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.isHighlighted) {
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

  if (isLoading) {
    return (
      <div className="mt-6">
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="w-full h-96 bg-white rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
  );
};

export default InteractiveChart;
