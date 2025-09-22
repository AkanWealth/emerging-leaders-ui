"use client";

import { useRouter } from "next/navigation";
import { CircleChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      aria-label="Go back"
      title="Go back"
      className="cursor-pointer"
    >
      <CircleChevronLeft className="size-6 text-primary" aria-hidden="true" />
    </Button>
  );
};

export default BackButton;
