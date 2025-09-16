"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

type FilterItem = {
  label: string;
  active: boolean;
};

const initialFilters: FilterItem[] = [
  { label: "Pending", active: false },
  { label: "In Progress", active: false },
  { label: "Resolved", active: false },
];

type SupportFilterProps = {
  onClose: () => void;
};

const SupportFilter = ({ onClose }: SupportFilterProps) => {
  const [filters, setFilters] = useState<FilterItem[]>(initialFilters);

  const toggleFilter = (index: number) => {
    setFilters((prev) =>
      prev.map((item, i) => ({
        ...item,
        active: i === index, // only this one is true, others false
      }))
    );
  };

  const applyFilters = () => {
    const selected = filters.find((f) => f.active)?.label;
    console.log("Applied Filter:", selected);
  };

  const cancelFilters = () => {
    setFilters(initialFilters);
    onClose();
  };

  return (
    <section className="absolute z-10 right-3 top-[100px] pb-[100px]">
      <section className="bg-white shadow border w-[260px] rounded-[20px]">
        <div>
          {filters.map((item, idx) => (
            <div key={idx}>
              <section
                className="px-[25px] py-[18px]"
                onClick={() => toggleFilter(idx)}
              >
                <aside className="flex items-center justify-between cursor-pointer">
                  <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
                    {item.label}
                  </h3>
                  {item.active && (
                    <CircleCheck className="h-[18px] w-[18px] text-[#A2185A]" />
                  )}
                </aside>
              </section>
              {idx < filters.length - 1 && (
                <div className="bg-[#E5E5E5] h-[1px] w-full"></div>
              )}
            </div>
          ))}

          <div className="flex px-[30px] py-[10px] gap-[12px]">
            <Button
              onClick={applyFilters}
              className="flex-1 cursor-pointer bg-[#A2185A] hover:bg-[#A2185A]/90 rounded-[12px] px-[16px] py-[6px]"
            >
              Apply
            </Button>
            <Button
              onClick={cancelFilters}
              className="flex-1 cursor-pointer border border-[#A2185A] bg-white hover:bg-[#f9f9f9] text-[#A2185A] rounded-[12px] px-[16px] py-[6px]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SupportFilter;
