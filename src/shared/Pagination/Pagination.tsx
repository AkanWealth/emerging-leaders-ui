"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  totalItems?: number;
  pageSizeOptions?: number[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function Pagination({
  totalItems = 1000,
  pageSizeOptions = [5, 8, 10, 20],
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePrev = () => onPageChange(Math.max(page - 1, 1));
  const handleNext = () => onPageChange(Math.min(page + 1, totalPages));

  // --- Generate page numbers with ellipses ---
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all if few pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first, last, current, and neighbors
      pages.push(1);
      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left: Page size selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show</span>
        <Select
          value={String(pageSize)}
          onValueChange={(val) => {
            onPageSizeChange(Number(val));
            onPageChange(1);
          }}
        >
          <SelectTrigger className="h-8 w-[70px] rounded-md border px-2 text-sm">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-600">of {totalItems}</span>
      </div>

      {/* Right: Pagination */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{page}-Page</span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={handlePrev}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {generatePageNumbers().map((num, i) =>
            num === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={num}
                size="sm"
                className={`h-8 w-8 rounded-md text-sm ${
                  page === num
                    ? "bg-[#A00058] text-white hover:bg-[#A00058]"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
                onClick={() => onPageChange(num as number)}
              >
                {num}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
