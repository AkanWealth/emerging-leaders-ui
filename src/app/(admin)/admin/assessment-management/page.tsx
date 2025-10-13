"use client";
import { useState } from "react";
import FooterBar from "../../../../shared/Footer/FooterBar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UserReportTab from "./Tabs/UserReportTab";
import FilterDropdown from "../../../../shared/Filter/FilterDropDown";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ListFilter, Search } from "lucide-react";
import AssessmentTab from "./Tabs/AssessmentTab";
import AssessmentFilter from "./AssessmentFilter";

const AssessmentManagementPage = () => {
  const [activeTab, setActiveTab] = useState<"assessment-list" | "user-report">(
    "assessment-list"
  );
  const [searchInput, setSearchInput] = useState(""); // raw text input
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <main className="flex flex-col gap-[39px]">
      <section className="flex justify-between items-center">
        <div className="flex flex-col gap-[4px]">
          <h1 className="text-[1.5rem] leading-[36px] font-medium text-[#2A2829]">
            Assessment Management
          </h1>
          <p className="text-[#65605C] font-normal text-[1rem] leading-[24px]">
            Create, filter, and manage assessment questions.
          </p>
        </div>
      </section>

      <section className="bg-[#FFFFFF] pb-[8px] pt-[12px] rounded-[12px] shadow overflow-hidden">
        <Tabs
          defaultValue="assessment-list"
          value={activeTab}
          onValueChange={(val) =>
            setActiveTab(val as "assessment-list" | "user-report")
          }
          className="flex-1"
        >
          <div className="flex justify-between items-center px-5 pt-4 pb-3.5 relative">
            <TabsList className="bg-transparent gap-3">
              <TabsTrigger
                value="assessment-list"
                className={cn(
                  "data-[state=active]:shadow-none data-[state=active]:text-[#A2185B] data-[state=active]:bg-transparent text-[1.25rem]",
                  activeTab === "assessment-list" ? "text-primary" : ""
                )}
              >
                Assessment List
              </TabsTrigger>
              <Separator orientation="vertical" />
              <TabsTrigger
                value="user-report"
                className={cn(
                  "data-[state=active]:shadow-none data-[state=active]:text-[#A2185B] data-[state=active]:bg-transparent text-[1.25rem]",
                  activeTab === "user-report" ? "text-primary" : ""
                )}
              >
                User Report
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="rounded-[12px] bg-[#F9F9F7] relative min-w-[385px] h-[48px] flex items-center justify-center py-[12px] px-[16px]">
                <Search className="absolute left-3 text-[#928F8B] h-[19.5px] w-[19.5px]" />
                <input
                  className="border-none outline-none pl-[40px] w-full text-[14px] text-[#928F8B]"
                  type="text"
                  placeholder="Search by title, category ..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <Button
                onClick={() => setShowFilter(!showFilter)}
                className="cursor-pointer flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] hover:text-[#F9F9F7] hover:bg-[#65605C] hover:shadow-2xl"
              >
                <ListFilter className="h-[12.75px] w-[22.5px]" />
                <span>Filter</span>
              </Button>

              <Button
                variant="toolbar"
                className="flex items-center gap-2 px-4 py-3 bg-[#F9F9F7] h-[48px]"
              >
                <Image
                  src="/assessment-management/download.svg"
                  alt="Download"
                  width={24}
                  height={24}
                />
                <span className="">Download</span>
              </Button>
            </div>
            {showFilter && <AssessmentFilter />}
          </div>

          {/* Assessment-list Tab */}

          <AssessmentTab />

          {/* User-report  Tab */}
          <UserReportTab />
        </Tabs>
      </section>

      <FooterBar />
    </main>
  );
};

export default AssessmentManagementPage;
