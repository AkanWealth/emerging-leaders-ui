"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FilterSelector from "./FilterSelector";

type UserRankingFilterProps = {
  onClose: () => void;
};

const rankingRange = [
  { value: "highest-to-lowest", label: "Highest to Lowest" },
  { value: "lowest-to-highest", label: "Lowest to Highest " },
];
const ageRanges = [
  { value: "0-20", label: "0 - 20" },
  { value: "21-50", label: "21 - 50" },
  { value: "51-above", label: "51 above" },
];
const goalCompletedRanges = [
  { value: "0-100", label: "0 - 100" },
  { value: "101-300", label: "101 - 300" },
  { value: "301-above", label: "301 above" },
];
const consistenceyStreakRanges = [
  { value: "0-20", label: "0 - 20 days" },
  { value: "21-50", label: "21 - 50 days" },
  { value: "51-above", label: "51 days above" },
];

const UserRankingFilter = ({ onClose }: UserRankingFilterProps) => {
  // Each dropdown has its own open state
  const [openSections, setOpenSections] = useState({
    ranking: false,
    projects: false,
    goals: false,
    streak: false,
  });

  const [selectedAge, setSelectedAge] = useState("0-20");
  const [selectedRange, setselectedRange] = useState("highest-to-lowest");
  const [selectedGoalsCompletedRange, setselectedGoalsCompletedRange] =
    useState("0-100");
  const [
    selectedConsistenceyStreakRanges,
    setSelectedConsistenceyStreakRanges,
  ] = useState("0-20");

  // Toggle helper
  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="bg-[#FFFFFF] border w-[480px] space-y-4 py-[15px] rounded-lg">
      {/* Ranking */}
      <section className="px-[30px]">
        <aside
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("ranking")}
        >
          <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
            Ranking
          </h3>
          {openSections.ranking ? (
            <ChevronUp className="text-[#A6A4A0]" />
          ) : (
            <ChevronDown className="text-[#A6A4A0]" />
          )}
        </aside>

        <AnimatePresence>
          {openSections.ranking && (
            <motion.aside
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              <FilterSelector
                options={rankingRange}
                selectedValue={selectedRange}
                onChange={setselectedRange}
                name="ranking-range"
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </section>
      <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

      {/* Projects Completed */}
      <section className="px-[30px]">
        <aside
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("projects")}
        >
          <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
            Projects Completed
          </h3>
          {openSections.projects ? (
            <ChevronUp className="text-[#A6A4A0]" />
          ) : (
            <ChevronDown className="text-[#A6A4A0]" />
          )}
        </aside>

        <AnimatePresence>
          {openSections.projects && (
            <motion.aside
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              <FilterSelector
                options={ageRanges}
                selectedValue={selectedAge}
                onChange={setSelectedAge}
                name="age-range"
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </section>
      <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

      {/* Goals Completed */}
      <section className="px-[30px]">
        <aside
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("goals")}
        >
          <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
            Goals Completed
          </h3>
          {openSections.goals ? (
            <ChevronUp className="text-[#A6A4A0]" />
          ) : (
            <ChevronDown className="text-[#A6A4A0]" />
          )}
        </aside>

        <AnimatePresence>
          {openSections.goals && (
            <motion.aside
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              <FilterSelector
                options={goalCompletedRanges}
                selectedValue={selectedGoalsCompletedRange}
                onChange={setselectedGoalsCompletedRange}
                name="goals-completed-range"
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </section>
      <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

      {/* Consistency Streak */}
      <section className="px-[30px]">
        <aside
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("streak")}
        >
          <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
            Consistency Streak
          </h3>
          {openSections.streak ? (
            <ChevronUp className="text-[#A6A4A0]" />
          ) : (
            <ChevronDown className="text-[#A6A4A0]" />
          )}
        </aside>

        <AnimatePresence>
          {openSections.streak && (
            <motion.aside
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              <FilterSelector
                options={consistenceyStreakRanges}
                selectedValue={selectedConsistenceyStreakRanges}
                onChange={setSelectedConsistenceyStreakRanges}
                name="selected-streak-range"
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </section>
      <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

      {/* Action buttons */}
      <section className="flex items-center gap-[10px] px-[30px]">
        <Button className="flex-1 bg-[#A2185A] rounded-[12px] font-medium text-[14px] cursor-pointer">
          Filter
        </Button>
        <Button
          onClick={onClose}
          className="flex-1 border border-[#A2185A] hover:bg-[#A2185A] hover:text-white bg-white text-[#A2185A] rounded-[12px] font-medium text-[14px] cursor-pointer"
        >
          Cancel
        </Button>
      </section>
    </section>
  );
};

export default UserRankingFilter;
