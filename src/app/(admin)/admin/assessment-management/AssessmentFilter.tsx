"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type AssessmentFilterProp = {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
};

const AssessmentFilter = ({
  selectedYear,
  setSelectedYear,
}: AssessmentFilterProp) => {
  const [startYear, setStartYear] = useState(2020);
  const endYear = startYear + 5;

  const handlePrev = () => setStartYear((prev) => prev - 6);
  const handleNext = () => setStartYear((prev) => prev + 6);

  const years = Array.from({ length: 6 }, (_, i) => startYear + i);
  return (
    <section className="absolute z-10 right-3 top-[100px] pb-[100px]">
      <section className="bg-white shadow border w-[260px] rounded-[20px]">
        <div className="w-[260px] rounded-2xl border bg-white  shadow-sm">
          {/* Header */}
          <div className="py-3 flex items-center justify-center text-gray-700 ">
            <div className="flex items-center justify-between gap-[15px]">
              <button
                onClick={handlePrev}
                aria-label="Previous years"
                title="Previous years"
                className="p-1  border border-[#7F7F82] rounded-full "
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold text-[#2A2829]">
                {startYear} - {endYear}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next years"
                title="Next years"
                className="p-1  border border-[#7F7F82] rounded-full "
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <hr />
          {/* Year Grid */}
          <div className="p-4 grid grid-cols-2 gap-3">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`rounded-[12px] border px-[16px] py-[6px] text-sm font-medium transition  cursor-pointer
              ${
                selectedYear === year
                  ? "bg-[#A2185A] border-[#A2185A] text-white"
                  : "border-[#A2185A] text-[#A2185A] hover:bg-[#A2185A]/10"
              }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default AssessmentFilter;
