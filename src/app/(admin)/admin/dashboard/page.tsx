"use client";
import { useUserStore } from "@/store/userStore";
import UserRankingTable from "./UserRankingTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiExport } from "react-icons/ci";
import Image from "next/image";

const DashboardPage = () => {
  const { user } = useUserStore();
  return (
    <main className="flex flex-col gap-[39px]">
      <section className="flex flex-col gap-[4px]">
        <h2 className="text-[#2A2829] font-medium text-[24px]">
          Welcome back,{" "}
          <span className="">{user?.name.trim().split(/\s+/)[0]}</span>
        </h2>
        <p className="text-[#65605C] font-normal text-[16px]">
          Monitor analytics on users effectively.
        </p>
      </section>
      <section className="">
        <section className=""></section>
        <Tabs
          defaultValue="growth"
          className="bg-[#FFFFFF]  pb-[8px] pt-[12px] rounded-[12px] shadow"
        >
          <aside className="flex px-[20px] items-center justify-between">
            <TabsList className=" h-[40px] w-[238px] bg-[#FAFAFA] border border-[#D5D7DA]">
              <TabsTrigger value="growth">User growth</TabsTrigger>
              <TabsTrigger value="ranking">User ranking</TabsTrigger>
            </TabsList>
            <aside className="">
              <TabsContent
                value="ranking"
                className="flex items-center gap-[16px]   "
              >
                <div className="rounded-[12px] bg-[#F9F9F7] relative min-w-[385px] h-[48px] flex items-center justify-center py-[12px] px-[16px]">
                  <Search className="absolute left-3 text-[#928F8B] h-[19.5px] w-[19.5px]" />
                  <input
                    className="border-none outline-none pl-[40px] w-full text-[14px] text-[#928F8B]"
                    type="text"
                    placeholder="Search by user..."
                  />
                </div>
                <Button
                  type="button"
                  className="flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] cursor-pointer hover:text-[#F9F9F7] hover:bg-[#65605C]  hover:shadow-2xl"
                >
                  <ListFilter className="h-[12.75px] w-[22.5px] " />
                  <span className="">Filter</span>
                </Button>
                <Button
                  type="button"
                  className="flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] cursor-pointer hover:text-[#F9F9F7] hover:bg-[#65605C]  hover:shadow-2xl"
                >
                  <CiExport className="h-[12.75px] w-[22.5px] " />
                  <span className="">Download</span>
                </Button>
              </TabsContent>
            </aside>
          </aside>
          <aside className="">
            <TabsContent
              className="border-t mt-[15px] px-[20px] rounded-t-[12px]  shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
              value="ranking"
            >
              <section className="flex items-center justify-center">
                <div className="flex items-center justify-between gap-[18px] py-9">
                  <Image
                    src="/dashboard/leaderBadge.svg"
                    alt="Leaderboard badge"
                    className=""
                    width={32}
                    height={32}
                  />
                  <h2 className="text-[#000000] text-[24px] font-medium">
                    Leaderboard
                  </h2>
                  <Image
                    src="/dashboard/leaderBadge.svg"
                    alt="Leaderboard badge"
                    className=""
                    width={32}
                    height={32}
                  />
                </div>
              </section>
              <UserRankingTable />
            </TabsContent>
            <TabsContent value="growth">Change your password here.</TabsContent>
          </aside>
        </Tabs>
      </section>
    </main>
  );
};

export default DashboardPage;
