"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UserReportTab from "./Tabs/UserReportTab";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ListFilter, Search } from "lucide-react";
import AssessmentTab from "./Tabs/AssessmentTab";
import AssessmentFilter from "./AssessmentFilter";
import Pagination from "@/shared/Pagination/Pagination";
import { useAssessmentList } from "@/hooks/admin/assessment/useAssessmentList";
import { useUserReport } from "@/hooks/admin/assessment/useUserReport";
import { useToastStore } from "@/store/toastStore";
import {
  downloadAssessmentListCSV,
  downloadUserReportCSV,
} from "./Tabs/downloadCSV";

const AssessmentManagementClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToastStore();

  // Get initial values from URL or defaults
  const [activeTab, setActiveTab] = useState<"assessment-list" | "user-report">(
    (searchParams.get("tab") as "assessment-list" | "user-report") ||
      "assessment-list",
  );

  // Assessment List tab state
  const [assessmentSearchInput, setAssessmentSearchInput] = useState(
    searchParams.get("assessmentSearch") || "",
  );
  const [assessmentSearch, setAssessmentSearch] = useState(
    searchParams.get("assessmentSearch") || "",
  );
  const [assessmentYear, setAssessmentYear] = useState<number>(
    Number(searchParams.get("assessmentYear")) || new Date().getFullYear(),
  );
  const [assessmentPage, setAssessmentPage] = useState(
    Number(searchParams.get("assessmentPage")) || 1,
  );
  const [assessmentLimit, setAssessmentLimit] = useState(8);
  const [showAssessmentFilter, setShowAssessmentFilter] =
    useState<boolean>(false);

  // User Report tab state
  const [userReportSearchInput, setUserReportSearchInput] = useState(
    searchParams.get("userReportSearch") || "",
  );
  const [userReportSearch, setUserReportSearch] = useState(
    searchParams.get("userReportSearch") || "",
  );
  const [userReportYear, setUserReportYear] = useState<number>(
    Number(searchParams.get("userReportYear")) || new Date().getFullYear(),
  );
  const [userReportPage, setUserReportPage] = useState(
    Number(searchParams.get("userReportPage")) || 1,
  );
  const [userReportLimit, setUserReportLimit] = useState(8);
  const [showUserReportFilter, setShowUserReportFilter] =
    useState<boolean>(false);

  // Fetch data for Assessment List
  const { data: assessmentData, isLoading: isAssessmentLoading } =
    useAssessmentList({
      limit: assessmentLimit,
      page: assessmentPage,
      search: assessmentSearch,
      year: assessmentYear,
    });

  // Fetch data for User Report
  const { data: userReportData, isLoading: isUserReportLoading } =
    useUserReport({
      limit: userReportLimit,
      page: userReportPage,
      year: userReportYear,
      search: userReportSearch,
    });

  // Update URL when parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("tab", activeTab);

    if (activeTab === "assessment-list") {
      if (assessmentSearch) params.set("assessmentSearch", assessmentSearch);
      if (assessmentYear !== new Date().getFullYear()) {
        params.set("assessmentYear", assessmentYear.toString());
      }
      if (assessmentPage > 1)
        params.set("assessmentPage", assessmentPage.toString());
    } else {
      if (userReportSearch) params.set("userReportSearch", userReportSearch);
      if (userReportYear !== new Date().getFullYear()) {
        params.set("userReportYear", userReportYear.toString());
      }
      if (userReportPage > 1)
        params.set("userReportPage", userReportPage.toString());
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    activeTab,
    assessmentSearch,
    assessmentYear,
    assessmentPage,
    userReportSearch,
    userReportYear,
    userReportPage,
    router,
  ]);

  // Debounce search for Assessment List
  useEffect(() => {
    const handler = setTimeout(() => {
      setAssessmentSearch(assessmentSearchInput);
      setAssessmentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [assessmentSearchInput]);

  // Debounce search for User Report
  useEffect(() => {
    const handler = setTimeout(() => {
      setUserReportSearch(userReportSearchInput);
      setUserReportPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [userReportSearchInput]);

  // Get current tab's state
  const currentSearchInput =
    activeTab === "assessment-list"
      ? assessmentSearchInput
      : userReportSearchInput;

  const currentYear =
    activeTab === "assessment-list" ? assessmentYear : userReportYear;

  const showFilter =
    activeTab === "assessment-list"
      ? showAssessmentFilter
      : showUserReportFilter;

  // Handle search input change
  const handleSearchChange = (value: string) => {
    if (activeTab === "assessment-list") {
      setAssessmentSearchInput(value);
    } else {
      setUserReportSearchInput(value);
    }
  };

  // Handle filter toggle
  const handleFilterToggle = () => {
    if (activeTab === "assessment-list") {
      setShowAssessmentFilter(!showAssessmentFilter);
    } else {
      setShowUserReportFilter(!showUserReportFilter);
    }
  };

  // Handle year change
  const handleYearChange = (year: number) => {
    if (activeTab === "assessment-list") {
      setAssessmentYear(year);
      setAssessmentPage(1);
    } else {
      setUserReportYear(year);
      setUserReportPage(1);
    }
  };

  const handleDownload = () => {
    if (isAssessmentLoading || isUserReportLoading) {
      showToast(
        "error",
        "Still loading",
        "Please wait while data is still loading.",
      );
    }
    if (activeTab === "assessment-list") {
      if (!assessmentData?.data || assessmentData.data.length === 0) {
        showToast(
          "error",
          "No available data",
          "No assessment data available to download",
        );
        return;
      }
      downloadAssessmentListCSV(assessmentData.data, assessmentYear);
      showToast(
        "success",
        "Download successful",
        "Assessment data downloaded successfully",
      );
    } else {
      if (!userReportData?.data || userReportData.data.length === 0) {
        showToast(
          "error",
          "No available data",
          "No user report data available to download",
        );
        return;
      }
      downloadUserReportCSV(userReportData.data, userReportYear);
      showToast(
        "success",
        "Download successful",
        "User report data downloaded successfully",
      );
    }
  };
  const filterRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        if (activeTab === "assessment-list" && showAssessmentFilter)
          setShowAssessmentFilter(false);
        if (activeTab === "user-report" && showUserReportFilter)
          setShowUserReportFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTab, showAssessmentFilter, showUserReportFilter]);

  return (
    <main className="flex flex-col gap-[39px] min-h-screen  ">
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

      <section className="bg-[#FFFFFF] h-full flex-1 pb-[8px] pt-[12px] rounded-[12px] shadow overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={(val) =>
            setActiveTab(val as "assessment-list" | "user-report")
          }
          className="flex-1 h-full"
        >
          <div className="flex justify-between items-center px-5 pt-4 pb-3.5 relative">
            <TabsList className="bg-transparent gap-3">
              <TabsTrigger
                value="assessment-list"
                className={cn(
                  "data-[state=active]:shadow-none data-[state=active]:text-[#A2185B] data-[state=active]:bg-transparent text-[1.25rem]",
                  activeTab === "assessment-list" ? "text-primary" : "",
                )}
              >
                Assessment List
              </TabsTrigger>
              <Separator orientation="vertical" />
              <TabsTrigger
                value="user-report"
                className={cn(
                  "data-[state=active]:shadow-none data-[state=active]:text-[#A2185B] data-[state=active]:bg-transparent text-[1.25rem]",
                  activeTab === "user-report" ? "text-primary" : "",
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
                  value={currentSearchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>

              <Button
                onClick={handleFilterToggle}
                className="cursor-pointer flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] hover:text-[#F9F9F7] hover:bg-[#65605C] hover:shadow-2xl"
              >
                <ListFilter className="h-[12.75px] w-[22.5px]" />
                <span>Filter</span>
              </Button>

              <Button
                onClick={handleDownload}
                variant="toolbar"
                className="flex items-center gap-2 px-4 py-3 bg-[#F9F9F7] h-[48px] cursor-pointer"
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
            {showFilter && (
              <AssessmentFilter
                ref={filterRef}
                selectedYear={currentYear}
                setSelectedYear={handleYearChange}
              />
            )}
          </div>

          {/* Assessment-list Tab */}
          <AssessmentTab
            assessmentData={assessmentData}
            isLoading={isAssessmentLoading}
          />

          {/* User-report Tab */}
          <UserReportTab
            isLoading={isUserReportLoading}
            userReportData={userReportData}
          />
        </Tabs>
      </section>

      {activeTab === "assessment-list" &&
        !isAssessmentLoading &&
        (assessmentData?.meta?.totalRecords ?? 0) > 0 && (
          <Pagination
            totalItems={assessmentData?.meta?.totalRecords ?? 0}
            page={assessmentPage}
            pageSize={assessmentLimit}
            onPageChange={setAssessmentPage}
            onPageSizeChange={setAssessmentLimit}
          />
        )}
      {activeTab === "user-report" &&
        !isUserReportLoading &&
        (userReportData?.meta?.totalUsers ?? 0) > 0 && (
          <Pagination
            totalItems={userReportData?.meta?.totalUsers ?? 0}
            page={userReportPage}
            pageSize={userReportLimit}
            onPageChange={setUserReportPage}
            onPageSizeChange={setUserReportLimit}
          />
        )}
    </main>
  );
};

export default AssessmentManagementClient;
