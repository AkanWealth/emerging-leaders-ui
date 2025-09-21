// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { CircleCheck } from "lucide-react";

// export enum TicketStatus {
//   PENDING = "PENDING",
//   IN_PROGRESS = "IN_PROGRESS",
//   RESOLVED = "RESOLVED",
// }

// type FilterItem = {
//   label: string;
//   value: TicketStatus;
// };

// const filters: FilterItem[] = [
//   { label: "Pending", value: TicketStatus.PENDING },
//   { label: "In Progress", value: TicketStatus.IN_PROGRESS },
//   { label: "Resolved", value: TicketStatus.RESOLVED },
// ];

// type SupportFilterProps = {
//   onClose: () => void;
//   setSelected: (value: TicketStatus | null) => void;
//   selected: TicketStatus | null;
// };

// const SupportFilter = ({ onClose, setSelected, selected }: SupportFilterProps) => {

//   const toggleFilter = (value: TicketStatus) => {
//     setSelected(selected === value ? null : value); // deselect if same clicked
//   };

//   const applyFilters = () => {
//     console.log("Applied Filter:", selected);
//   };

//   const cancelFilters = () => {
//     setSelected(null);
//     onClose();
//   };

//   return (
//     <section className="absolute z-10 right-3 top-[100px] pb-[100px]">
//       <section className="bg-white shadow border w-[260px] rounded-[20px]">
//         <div>
//           {filters.map((item, idx) => (
//             <div key={item.value}>
//               <section
//                 className="px-[25px] py-[18px] cursor-pointer"
//                 onClick={() => toggleFilter(item.value)}
//               >
//                 <aside className="flex items-center justify-between">
//                   <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
//                     {item.label}
//                   </h3>
//                   {selected === item.value && (
//                     <CircleCheck className="h-[18px] w-[18px] text-[#A2185A]" />
//                   )}
//                 </aside>
//               </section>
//               {idx < filters.length - 1 && (
//                 <div className="bg-[#E5E5E5] h-[1px] w-full"></div>
//               )}
//             </div>
//           ))}

//           <div className="flex px-[30px] py-[10px] gap-[12px]">
//             <Button
//               onClick={applyFilters}
//               className="flex-1 cursor-pointer bg-[#A2185A] hover:bg-[#A2185A]/90 rounded-[12px] px-[16px] py-[6px]"
//             >
//               Apply
//             </Button>
//             <Button
//               onClick={cancelFilters}
//               className="flex-1 cursor-pointer border border-[#A2185A] bg-white hover:bg-[#f9f9f9] text-[#A2185A] rounded-[12px] px-[16px] py-[6px]"
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default SupportFilter;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

export enum TicketStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}

type FilterItem = {
  label: string;
  value: TicketStatus;
};

const filters: FilterItem[] = [
  { label: "Pending", value: TicketStatus.PENDING },
  { label: "In Progress", value: TicketStatus.IN_PROGRESS },
  { label: "Resolved", value: TicketStatus.RESOLVED },
];

type SupportFilterProps = {
  onClose: () => void;
  setSelected: (value: TicketStatus | null) => void;
  selected: TicketStatus | null;
};

const SupportFilter = ({
  onClose,
  setSelected,
  selected,
}: SupportFilterProps) => {
  // temporary selection that only applies when user clicks "Apply"
  const [tempSelected, setTempSelected] = useState<TicketStatus | null>(
    selected
  );

  const toggleFilter = (value: TicketStatus) => {
    setTempSelected(tempSelected === value ? null : value); // works only locally
  };

  const applyFilters = () => {
    setSelected(tempSelected); // commit choice to parent
    onClose();
  };

  const cancelFilters = () => {
    setTempSelected(null); // reset temp back to original
    setSelected(null);
    onClose();
  };

  return (
    <section className="absolute z-10 right-3 top-[100px] pb-[100px]">
      <section className="bg-white shadow border w-[260px] rounded-[20px]">
        <div>
          {filters.map((item, idx) => (
            <div key={item.value}>
              <section
                className="px-[25px] py-[18px] cursor-pointer"
                onClick={() => toggleFilter(item.value)}
              >
                <aside className="flex items-center justify-between">
                  <h3 className="text-[#2A2829] text-[16px] leading-[24px] font-normal">
                    {item.label}
                  </h3>
                  {tempSelected === item.value && (
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
