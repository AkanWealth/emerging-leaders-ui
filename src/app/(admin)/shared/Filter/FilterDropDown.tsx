"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import FilterDropDownAccordions from "./FilterDropDownAccordions";

const FilterDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="toolbar"
          className="group flex items-center gap-2 px-4 py-3"
        >
          <ListFilter
            size={24}
            className="transition-colors group-hover:text-foreground"
          />
          <span className="transition-colors group-hover:text-foreground">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[350px] rounded-xl bg-popover text-popover-foreground shadow-[0px_8px_29px_0px_#5F5E5E30]">
        <FilterDropDownAccordions />

        {/* Filter-DropdownMenu Footer */}
        <div className="grid grid-cols-2 gap-3 border-t px-6 py-4">
          <Button className="rounded-[12px]">Filter</Button>
          <Button
            variant="outline"
            className="border-primary text-primary rounded-[12px]"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
