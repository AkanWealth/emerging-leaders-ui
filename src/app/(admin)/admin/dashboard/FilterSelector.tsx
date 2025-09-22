// import React from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// interface FilterSelectorProps {
//   options: Option[];
//   selectedValue: string;
//   onChange: (value: string) => void;
//   name?: string; // optional for grouping radios
// }

// export default function FilterSelector({
//   options,
//   selectedValue,
//   onChange,
//   name = "filter-selector",
// }: FilterSelectorProps) {
//   return (
//     <div className="space-y-3">
//       {options.map((option) => (
//         <label
//           key={option.value}
//           className="flex items-center ml-[50px] py-2 rounded-lg space-x-3 cursor-pointer w-fit"
//         >
//           <input
//             type="radio"
//             name={name}
//             value={option.value}
//             checked={selectedValue === option.value}
//             onChange={(e) => onChange(e.target.value)}
//             className="sr-only"
//           />
//           <div
//             className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//               selectedValue === option.value
//                 ? "bg-[#FFECB2] border-[#FFD780]"
//                 : "bg-gray-100 border-gray-300"
//             }`}
//           >
//             {selectedValue === option.value && (
//               <div className="w-3 h-3 rounded-full bg-[#FFFFFF]"></div>
//             )}
//           </div>
//           <span className="text-[#000000] text-[14px] font-normal leading-[24px]">
//             {option.label}
//           </span>
//         </label>
//       ))}
//     </div>
//   );
// }

import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FilterSelectorProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  name?: string; // optional for grouping radios
}

export default function FilterSelector({
  options,
  selectedValue,
  onChange,
  name = "filter-selector",
}: FilterSelectorProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center ml-[50px] py-2 rounded-lg space-x-3 cursor-pointer w-fit"
          onClick={(e) => {
            // Prevent the browser default radio handling
            e.preventDefault();
            if (selectedValue === option.value) {
              // clicking again -> unselect
              onChange("");
            } else {
              onChange(option.value);
            }
          }}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            readOnly // important: we handle it manually
            className="sr-only"
          />
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedValue === option.value
                ? "bg-[#FFECB2] border-[#FFD780]"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            {selectedValue === option.value && (
              <div className="w-3 h-3 rounded-full bg-[#FFFFFF]"></div>
            )}
          </div>
          <span className="text-[#000000] text-[14px] font-normal leading-[24px]">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
