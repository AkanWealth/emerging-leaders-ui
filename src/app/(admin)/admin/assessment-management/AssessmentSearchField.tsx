"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const AssessmentSearchField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative rounded-md w-full max-w-sm border border-transparent focus-within:border-black hover:border-black transition-colors">
      <Label>
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={24}
          aria-hidden="true"
        />
        <Input
          ref={ref}
          type="text"
          placeholder="Search by user..."
          className={cn(
            "pl-[52px] bg-secondary-50 placeholder:text-gray-500",
            className
          )} // By default the input element has padding-left of 52px to accommodate the search icon
          {...props}
        />
      </Label>
    </div>
  );
});

AssessmentSearchField.displayName = "AssessmentSearchField";

export default AssessmentSearchField;
