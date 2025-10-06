// "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { AdminStatus } from "@/hooks/admin/user-management/useAdminList";

type FilterItem = {
  label: string;
  value: AdminStatus;
};

const initialFilters: FilterItem[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Deactivated", value: "DEACTIVATED" },
];

type UserManagementFilterProps = {
  onClose: () => void;
  setSelected: (value: AdminStatus | null) => void;
  selected: AdminStatus | null;
};

const UserManagementFilter = ({
  setSelected,
  selected,
  onClose,
}: UserManagementFilterProps) => {
  const [tempSelected, setTempSelected] = useState<AdminStatus | null>(
    selected
  );

  const toggleFilter = (value: AdminStatus) => {
    setTempSelected((prev) => (prev === value ? null : value));
  };

  const applyFilters = () => {
    setSelected(tempSelected);
    onClose();
  };

  const cancelFilters = () => {
    setTempSelected(null);
    setSelected(null);
    onClose();
  };

  return (
    <section className="absolute z-10 right-3 top-[100px] pb-[100px]">
      <section className="bg-white shadow border w-[260px] rounded-[20px]">
        <div>
          {initialFilters.map((item, idx) => (
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
              {idx < initialFilters.length - 1 && (
                <div className="bg-[#E5E5E5] h-[1px] w-full"></div>
              )}
            </div>
          ))}

          <div className="flex px-[30px] py-[10px] gap-[12px]">
            <Button
              onClick={applyFilters}
              className="flex-1 bg-[#A2185A] hover:bg-[#A2185A]/90 rounded-[12px] px-[16px] py-[6px]"
            >
              Apply
            </Button>
            <Button
              onClick={cancelFilters}
              className="flex-1 border border-[#A2185A] bg-white hover:bg-[#f9f9f9] text-[#A2185A] rounded-[12px] px-[16px] py-[6px]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default UserManagementFilter;
