"use client";

import { useToastStore } from "@/store/toastStore";
import { useEffect, useState } from "react";

export default function Toast() {
  const { isOpen, type, heading, description, duration, closeToast } =
    useToastStore();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);

      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      closeToast();
    }, 300);
  };

  if (!isVisible) return null;

  const colors = {
    success: {
      bg: "bg-[#FAF5FF]",
      border: "border-t-4 border-[#7C3AED]",
      icon: "bg-[#7C3AED]",
      heading: "text-[#5B21B6]",
    },
    error: {
      bg: "bg-red-50",
      border: "border-t-4 border-red-500",
      icon: "bg-red-500",
      heading: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-t-4 border-yellow-500",
      icon: "bg-yellow-500",
      heading: "text-yellow-600",
    },
  };

  const { bg, border, icon, heading: headingColor } = colors[type];

  return (
    <div className="fixed top-7 right-4 z-50 pointer-events-none">
      <div
        className={`
          ${bg} ${border} shadow-lg rounded-xl px-6 py-3 flex items-center gap-3
          pointer-events-auto transition-all duration-300 ease-out
          ${
            isAnimating
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }
        `}
      >
        <div
          className={`w-6 h-6 rounded-full ${icon} flex items-center justify-center text-white text-sm`}
        >
          !
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${headingColor}`}>
            {heading}
          </span>
          <span className="text-xs text-gray-600">{description}</span>
        </div>
        <button
          onClick={handleClose}
          className="ml-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
}
