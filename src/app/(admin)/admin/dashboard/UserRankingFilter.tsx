// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import FilterSelector from "./FilterSelector";

// type UserRankingFilterProps = {
//   onClose: () => void;
//   onApply: (filters: {
//     ranking?: string;
//     completed?: string;
//     goals?: string;
//     streak?: string;
//   }) => void;
// };

// const rankingRange = [
//   { value: "highest", label: "Highest to Lowest" },
//   { value: "lowest", label: "Lowest to Highest " },
// ];
// const ageRanges = [
//   { value: "0-20", label: "0 - 20" },
//   { value: "21-50", label: "21 - 50" },
//   { value: "51-above", label: "51 above" },
// ];
// const goalCompletedRanges = [
//   { value: "0-100", label: "0 - 100" },
//   { value: "101-300", label: "101 - 300" },
//   { value: "301-above", label: "301 above" },
// ];
// const consistenceyStreakRanges = [
//   { value: "0-20", label: "0 - 20 days" },
//   { value: "21-50", label: "21 - 50 days" },
//   { value: "51-above", label: "51 days above" },
// ];

// const UserRankingFilter = ({ onClose, onApply }: UserRankingFilterProps) => {
//   // Each dropdown has its own open state
//   const [openSections, setOpenSections] = useState({
//     ranking: false,
//     projects: false,
//     goals: false,
//     streak: false,
//   });

//   const [selectedAge, setSelectedAge] = useState("");
//   const [selectedRange, setselectedRange] = useState("");
//   const [selectedGoalsCompletedRange, setselectedGoalsCompletedRange] =
//     useState("");
//   const [
//     selectedConsistenceyStreakRanges,
//     setSelectedConsistenceyStreakRanges,
//   ] = useState("");

//   // Toggle helper
//   const toggleSection = (key: keyof typeof openSections) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <section className="bg-[#FFFFFF] border w-[480px] space-y-4 py-[15px] rounded-lg">
//       {/* Ranking */}
//       <section className="px-[30px]">
//         <aside
//           className="flex items-center justify-between cursor-pointer"
//           onClick={() => toggleSection("ranking")}
//         >
//           <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
//             Ranking
//             <span className="pl-[25px] text-[#A2185A]">
//               {selectedRange &&
//                 rankingRange.find((item) => item.value === selectedRange)
//                   ?.label}
//             </span>
//           </h3>
//           {openSections.ranking ? (
//             <ChevronUp className="text-[#A6A4A0]" />
//           ) : (
//             <ChevronDown className="text-[#A6A4A0]" />
//           )}
//         </aside>

//         <AnimatePresence>
//           {openSections.ranking && (
//             <motion.aside
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="mt-3 overflow-hidden"
//             >
//               <FilterSelector
//                 options={rankingRange}
//                 selectedValue={selectedRange}
//                 onChange={setselectedRange}
//                 name="ranking-range"
//               />
//             </motion.aside>
//           )}
//         </AnimatePresence>
//       </section>
//       <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

//       {/* Projects Completed */}
//       <section className="px-[30px]">
//         <aside
//           className="flex items-center justify-between cursor-pointer"
//           onClick={() => toggleSection("projects")}
//         >
//           <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
//             Projects Completed
//             <span className="pl-[25px] text-[#A2185A]">
//               {selectedAge &&
//                 ageRanges.find((item) => item.value === selectedAge)?.label}
//             </span>
//           </h3>
//           {openSections.projects ? (
//             <ChevronUp className="text-[#A6A4A0]" />
//           ) : (
//             <ChevronDown className="text-[#A6A4A0]" />
//           )}
//         </aside>

//         <AnimatePresence>
//           {openSections.projects && (
//             <motion.aside
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="mt-3 overflow-hidden"
//             >
//               <FilterSelector
//                 options={ageRanges}
//                 selectedValue={selectedAge}
//                 onChange={setSelectedAge}
//                 name="age-range"
//               />
//             </motion.aside>
//           )}
//         </AnimatePresence>
//       </section>
//       <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

//       {/* Goals Completed */}
//       <section className="px-[30px]">
//         <aside
//           className="flex items-center justify-between cursor-pointer"
//           onClick={() => toggleSection("goals")}
//         >
//           <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
//             Goals Completed{" "}
//             <span className="pl-[25px] text-[#A2185A]">
//               {selectedGoalsCompletedRange &&
//                 goalCompletedRanges.find(
//                   (item) => item.value === selectedGoalsCompletedRange
//                 )?.label}
//             </span>
//           </h3>
//           {openSections.goals ? (
//             <ChevronUp className="text-[#A6A4A0]" />
//           ) : (
//             <ChevronDown className="text-[#A6A4A0]" />
//           )}
//         </aside>

//         <AnimatePresence>
//           {openSections.goals && (
//             <motion.aside
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="mt-3 overflow-hidden"
//             >
//               <FilterSelector
//                 options={goalCompletedRanges}
//                 selectedValue={selectedGoalsCompletedRange}
//                 onChange={setselectedGoalsCompletedRange}
//                 name="goals-completed-range"
//               />
//             </motion.aside>
//           )}
//         </AnimatePresence>
//       </section>
//       <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

//       {/* Consistency Streak */}
//       <section className="px-[30px]">
//         <aside
//           className="flex items-center justify-between cursor-pointer"
//           onClick={() => toggleSection("streak")}
//         >
//           <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
//             Consistency Streak
//             <span className="pl-[25px] text-[#A2185A]">
//               {selectedConsistenceyStreakRanges &&
//                 consistenceyStreakRanges.find(
//                   (item) => item.value === selectedConsistenceyStreakRanges
//                 )?.label}
//             </span>
//           </h3>
//           {openSections.streak ? (
//             <ChevronUp className="text-[#A6A4A0]" />
//           ) : (
//             <ChevronDown className="text-[#A6A4A0]" />
//           )}
//         </aside>

//         <AnimatePresence>
//           {openSections.streak && (
//             <motion.aside
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="mt-3 overflow-hidden"
//             >
//               <FilterSelector
//                 options={consistenceyStreakRanges}
//                 selectedValue={selectedConsistenceyStreakRanges}
//                 onChange={setSelectedConsistenceyStreakRanges}
//                 name="selected-streak-range"
//               />
//             </motion.aside>
//           )}
//         </AnimatePresence>
//       </section>
//       <div className="bg-[#E5E5E5] h-[1px] w-full"></div>

//       {/* Action buttons */}
//       <section className="flex items-center gap-[10px] px-[30px]">
//         <Button
//           onClick={() => {
//             onApply({
//               ranking: selectedRange,
//               completed: selectedAge,
//               goals: selectedGoalsCompletedRange,
//               streak: selectedConsistenceyStreakRanges,
//             });
//             onClose();
//           }}
//           className="flex-1 bg-[#A2185A] rounded-[12px] font-medium text-[14px] cursor-pointer"
//         >
//           Filter
//         </Button>

//         <Button
//           onClick={onClose}
//           className="flex-1 border border-[#A2185A] hover:bg-[#A2185A] hover:text-white bg-white text-[#A2185A] rounded-[12px] font-medium text-[14px] cursor-pointer"
//         >
//           Cancel
//         </Button>
//       </section>
//     </section>
//   );
// };

// export default UserRankingFilter;

"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FilterSelector from "./FilterSelector";

type UserRankingFilterProps = {
  onClose: () => void;
  onApply: (filters: {
    ranking?: string;
    completed?: string;
    goals?: string;
    streak?: string;
  }) => void;
  currentFilters?: {
    // Add this prop
    ranking?: string;
    completed?: string;
    goals?: string;
    streak?: string;
  };
};

const rankingRange = [
  { value: "highest", label: "Highest to Lowest" },
  { value: "lowest", label: "Lowest to Highest " },
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

const UserRankingFilter = ({
  onClose,
  onApply,
  currentFilters = {},
}: UserRankingFilterProps) => {
  // Each dropdown has its own open state
  const [openSections, setOpenSections] = useState({
    ranking: false,
    projects: false,
    goals: false,
    streak: false,
  });

  // Initialize state with current filters
  const [selectedAge, setSelectedAge] = useState(
    currentFilters.completed || ""
  );
  const [selectedRange, setselectedRange] = useState(
    currentFilters.ranking || ""
  );
  const [selectedGoalsCompletedRange, setselectedGoalsCompletedRange] =
    useState(currentFilters.goals || "");
  const [
    selectedConsistenceyStreakRanges,
    setSelectedConsistenceyStreakRanges,
  ] = useState(currentFilters.streak || "");

  // Update state when currentFilters prop changes
  useEffect(() => {
    setSelectedAge(currentFilters.completed || "");
    setselectedRange(currentFilters.ranking || "");
    setselectedGoalsCompletedRange(currentFilters.goals || "");
    setSelectedConsistenceyStreakRanges(currentFilters.streak || "");
  }, [currentFilters]);

  // Toggle helper
  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Add clear all filters function
  const clearAllFilters = () => {
    setSelectedAge("");
    setselectedRange("");
    setselectedGoalsCompletedRange("");
    setSelectedConsistenceyStreakRanges("");
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
            <span className="pl-[25px] text-[#A2185A]">
              {selectedRange &&
                rankingRange.find((item) => item.value === selectedRange)
                  ?.label}
            </span>
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
            <span className="pl-[25px] text-[#A2185A]">
              {selectedAge &&
                ageRanges.find((item) => item.value === selectedAge)?.label}
            </span>
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
            Goals Completed{" "}
            <span className="pl-[25px] text-[#A2185A]">
              {selectedGoalsCompletedRange &&
                goalCompletedRanges.find(
                  (item) => item.value === selectedGoalsCompletedRange
                )?.label}
            </span>
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
            <span className="pl-[25px] text-[#A2185A]">
              {selectedConsistenceyStreakRanges &&
                consistenceyStreakRanges.find(
                  (item) => item.value === selectedConsistenceyStreakRanges
                )?.label}
            </span>
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
        <Button
          onClick={() => {
            onApply({
              ranking: selectedRange,
              completed: selectedAge,
              goals: selectedGoalsCompletedRange,
              streak: selectedConsistenceyStreakRanges,
            });
            onClose();
          }}
          className="flex-1 bg-[#A2185A] hover:bg-[#7F1347] rounded-[12px] font-medium text-[14px] cursor-pointer"
        >
          Filter
        </Button>

        <Button
          onClick={() => {
            clearAllFilters();
            onApply({}); // Apply empty filters
            onClose();
          }}
          variant="outline"
          className="flex-1 border border-[#A2185A] hover:bg-[#A2185A] hover:text-white bg-white text-[#A2185A] rounded-[12px] font-medium text-[14px] cursor-pointer"
        >
          Clear All
        </Button>
      </section>
    </section>
  );
};

export default UserRankingFilter;


export const parseFilterRange = (rangeValue: string, filterType: string) => {
  if (!rangeValue) return {};

  switch (filterType) {
    case "completed": // Projects Completed
      if (rangeValue === "0-20") return { completedMin: 0, completedMax: 20 };
      if (rangeValue === "21-50") return { completedMin: 21, completedMax: 50 };
      if (rangeValue === "51-above") return { completedMin: 51 };
      break;

    case "goals": // Goals Completed
      if (rangeValue === "0-100") return { goalsMin: 0, goalsMax: 100 };
      if (rangeValue === "101-300") return { goalsMin: 101, goalsMax: 300 };
      if (rangeValue === "301-above") return { goalsMin: 301 };
      break;

    case "streak": // Consistency Streak
      if (rangeValue === "0-20") return { streakMin: 0, streakMax: 20 };
      if (rangeValue === "21-50") return { streakMin: 21, streakMax: 50 };
      if (rangeValue === "51-above") return { streakMin: 51 };
      break;
  }

  return {};
};
