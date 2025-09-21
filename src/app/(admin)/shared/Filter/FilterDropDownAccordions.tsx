"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FilterDropDownAccordions = () => {
  const [filters, setFilters] = useState({
    ranking: "highest-to-lowest",
    projects: "",
    goals: "",
    streak: "",
  });

  return (
    <Accordion type="single" collapsible>
      {/* Ranking */}
      <AccordionItem value="ranking" className="px-4">
        <AccordionTrigger className="font-normal hover:no-underline data-[state=open]:no-underline">
          Ranking
        </AccordionTrigger>
        <AccordionContent className="pl-[35px]">
          <RadioGroup
            value={filters.ranking}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, ranking: value }))
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="highest-to-lowest"
                id="highest-to-lowest"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="highest-to-lowest" className="font-normal">
                Highest to lowest
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="lowest-to-highest"
                id="lowest-to-highest"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="lowest-to-highest" className="font-normal">
                Lowest to highest
              </Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Projects Completed */}
      <AccordionItem value="projects" className="px-4">
        <AccordionTrigger className="font-normal hover:no-underline data-[state=open]:no-underline">
          Projects Completed
        </AccordionTrigger>
        <AccordionContent className="pl-[35px]">
          <RadioGroup
            value={filters.projects}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, projects: value }))
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="0-20"
                id="0-20"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="0-20" className="font-normal">
                0-20
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="21-50"
                id="21-50"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="21-50" className="font-normal">
                21-50
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="51-above"
                id="51-above"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="51-above" className="font-normal">
                51 above
              </Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Goals Completed */}
      <AccordionItem value="goals" className="px-4">
        <AccordionTrigger className="font-normal hover:no-underline data-[state=open]:no-underline">
          Goals Completed
        </AccordionTrigger>
        <AccordionContent className="pl-[35px]">
          <RadioGroup
            value={filters.goals}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, goals: value }))
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="0-100"
                id="0-100"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="0-100" className="font-normal">
                0-100
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="101-300"
                id="101-300"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="101-300" className="font-normal">
                101-300
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="301-above"
                id="301-above"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="301-above" className="font-normal">
                301 above
              </Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Consistency Streak */}
      <AccordionItem value="streak" className="px-4">
        <AccordionTrigger className="font-normal hover:no-underline data-[state=open]:no-underline">
          Consistency Streak
        </AccordionTrigger>
        <AccordionContent className="pl-[35px]">
          <RadioGroup
            value={filters.streak}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, streak: value }))
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="0-20-days"
                id="0-20-days"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="0-20-days" className="font-normal">
                0-20 days
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="21-50-days"
                id="21-50-days"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="21-50-days" className="font-normal">
                21-50 days
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="51-above-days"
                id="51-above-days"
                className="data-[state=checked]:bg-[#FFECB2] data-[state=checked]:border-[#FFD780]"
              />
              <Label htmlFor="51-above-days" className="font-normal">
                51 days above
              </Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterDropDownAccordions;
