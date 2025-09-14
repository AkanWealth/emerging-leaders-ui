"use client";

import { useToastStore } from "@/store/toastStore";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Toast() {
  const { isOpen, type, heading, description, closeToast, duration } =
    useToastStore();
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        closeToast();
      }, duration);

      return () => clearTimeout(timer); // cleanup on unmount or re-render
    }
  }, [isOpen, duration, closeToast]);

  const colors = {
    success: {
      bg: "bg-[#fff]",
      border: "border-l-4 border-[#3DA755]",
      iconText: "text-[#3DA755] h-[9px] w-[9px]",
      icon: "bg-[#E7F6EC] border-2 border-[#B5E3C4] h-[24px] w-[24px] rounded-[8px]",
      heading: "text-[#2A2829]",
    },
    error: {
      bg: "bg-[#fff]",
      border: "border-l-4 border-[#E81313]",
      iconText: "text-[#E81313] h-[9px] w-[9px]",
      icon: "bg-[#FBEAE9] border-2 border-[#F2BCBA] h-[24px] w-[24px] rounded-[8px]",
      heading: "text-[#2A2829]",
    },
    warning: {
      bg: "bg-[#fff]",
      border: "border-l-4 border-[#FBBF24]",
      iconText: "text-[#FBBF24] h-[9px] w-[9px]",
      icon: "bg-[#FEF3C7] border-2 border-[#FCD34D] h-[24px] w-[24px] rounded-[8px]",
      heading: "text-[#2A2829]",
    },
  };

  const { bg, border, icon, iconText, heading: headingColor } = colors[type];

  return (
    <div className="fixed top-7 right-4 z-[99999] pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="toast"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
              duration: 0.4,
            }}
            className={`
              ${bg} ${border} shadow-lg rounded-xl overflow-hidden pl-6 pr-6 py-3 flex items-center gap-3
              pointer-events-auto w-[470px] h-[66px]
            `}
          >
            <div className={`${icon} flex items-center justify-center`}>
              <FaCheckCircle className={iconText} />
            </div>

            <div className="flex flex-col ml-3.5 gap-[2px] flex-1">
              <span className={`text-sm font-medium ${headingColor}`}>
                {heading}
              </span>
              <span className="text-xs text-[#65605C]">{description}</span>
            </div>
            <button
              onClick={closeToast}
              className="ml-3 cursor-pointer text-[#000000] hover:text-[#000000]/70"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
