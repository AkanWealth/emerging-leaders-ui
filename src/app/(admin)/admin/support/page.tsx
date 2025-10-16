"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { ListFilter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SupportTable from "./SupportTable";
import SupportFilter, { TicketStatus } from "./SupportFilter";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { supportModalStore } from "@/store/supportStore";
import ViewTicket from "./Tabs/ViewTicket";
import CloseTicket from "./Tabs/CloseTicket";
import { SupportTicket, useSupport } from "@/hooks/admin/support/useSupport";
import Pagination from "../../../../shared/Pagination/Pagination";
import DeleteTicket from "./Tabs/DeleteTicket";

const SupportPage = () => {
  const [selected, setSelected] = useState<TicketStatus | null>(null);
  const [searchInput, setSearchInput] = useState(""); // raw text input
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [showFilter, setShowFilter] = useState(false);
  const { modalType, closeModal } = supportModalStore();
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // reset to first page on new search
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchInput]);
  const { data: supportData, isLoading } = useSupport({
    search,
    status: selected ?? undefined,
    page,
    limit,
  });
  return (
    <main className="flex flex-col gap-[39px] min-h-screen">
      {/* Welcome Section */}
      <section className="flex flex-col gap-[4px]">
        <h2 className="text-[#2A2829] font-medium text-[24px]">
          Support Ticket
        </h2>
        <p className="text-[#65605C] font-normal text-[16px]">
          All submitted issues and inquiries in one place.
        </p>
      </section>

      <section className="flex flex-col gap-[20px]  flex-1 h-full">
        <section className="grid grid-cols-4 gap-[24px]">
          {/* Total Users */}
          <aside className="bg-white border border-[#E9EAEB] rounded-[12px]">
            <h3 className="px-[20px] py-[15px] text-[#181D27] font-semibold text-[14px] leading-[20px]">
              Total complaints
            </h3>
            <aside className="border-t rounded-[12px] px-[20px] py-[15px]">
              <aside className="flex items-center justify-between">
                {isLoading ? (
                  <aside className="flex items-center gap-[8px]">
                    <Skeleton className="w-[60px] h-[32px] rounded-md" />
                  </aside>
                ) : (
                  <aside className="flex items-center gap-[8px]">
                    <h3 className="text-[#181D27] font-medium text-[32px]">
                      {(supportData?.stats.resolved ?? 0) +
                        (supportData?.stats.pending ?? 0) +
                        (supportData?.stats.inProgress ?? 0)}
                    </h3>
                  </aside>
                )}
              </aside>
            </aside>
          </aside>

          <aside className="bg-white border border-[#E9EAEB] rounded-[12px]">
            <h3 className="px-[20px] py-[15px] text-[#181D27] font-semibold text-[14px] leading-[20px]">
              Resolved complaints
            </h3>
            <aside className="border-t rounded-[12px] px-[20px] py-[15px]">
              <aside className="flex items-center justify-between">
                {isLoading ? (
                  <aside className="flex items-center gap-[8px]">
                    <Skeleton className="w-[60px] h-[32px] rounded-md" />
                  </aside>
                ) : (
                  <aside className="flex items-center gap-[8px]">
                    <h3 className="text-[#181D27] font-medium text-[32px]">
                      {supportData?.stats.resolved ?? 0}
                    </h3>
                  </aside>
                )}
              </aside>
            </aside>
          </aside>

          <aside className="bg-white border border-[#E9EAEB] rounded-[12px]">
            <h3 className="px-[20px] py-[15px] text-[#181D27] font-semibold text-[14px] leading-[20px]">
              Inprogress complaints
            </h3>
            <aside className="border-t rounded-[12px] px-[20px] py-[15px]">
              <aside className="flex items-center justify-between">
                {isLoading ? (
                  <aside className="flex items-center gap-[8px]">
                    <Skeleton className="w-[60px] h-[32px] rounded-md" />
                  </aside>
                ) : (
                  <aside className="flex items-center gap-[8px]">
                    <h3 className="text-[#181D27] font-medium text-[32px]">
                      {supportData?.stats.inProgress ?? 0}
                    </h3>
                  </aside>
                )}
              </aside>
            </aside>
          </aside>

          <aside className="bg-white border border-[#E9EAEB] rounded-[12px]">
            <h3 className="px-[20px] py-[15px] text-[#181D27] font-semibold text-[14px] leading-[20px]">
              Pending complaints
            </h3>
            <aside className="border-t rounded-[12px] px-[20px] py-[15px]">
              <aside className="flex items-center justify-between">
                {isLoading ? (
                  <aside className="flex items-center gap-[8px]">
                    <Skeleton className="w-[60px] h-[32px] rounded-md" />
                  </aside>
                ) : (
                  <aside className="flex items-center gap-[8px]">
                    <h3 className="text-[#181D27] font-medium text-[32px]">
                      {supportData?.stats.pending ?? 0}
                    </h3>
                  </aside>
                )}
              </aside>
            </aside>
          </aside>
        </section>

        <section className="bg-[#FFFFFF] flex-1 pb-[8px] pt-[12px] rounded-[12px] shadow relative">
          <aside className="flex px-[20px] items-center justify-between ">
            <h3 className="text-[#2A2829] font-medium text-[20px] leading-[30px]">
              Ticket List
            </h3>
            <aside>
              <section className="flex items-center gap-[16px]">
                <div className="rounded-[12px] bg-[#F9F9F7] relative min-w-[385px] h-[48px] flex items-center justify-center py-[12px] px-[16px]">
                  <Search className="absolute left-3 text-[#928F8B] h-[19.5px] w-[19.5px]" />
                  <input
                    className="border-none outline-none pl-[40px] w-full text-[14px] text-[#928F8B]"
                    type="text"
                    placeholder="Search by ticket id, date..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="flex items-center cursor-pointer gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] hover:text-[#F9F9F7] hover:bg-[#65605C] hover:shadow-2xl"
                >
                  <ListFilter className="h-[12.75px] w-[22.5px]" />
                  <span>Filter</span>
                </Button>
              </section>
            </aside>
          </aside>
          <aside>
            <section className="border-t mt-[15px] min-h-[500px] px-[20px] rounded-t-[12px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <SupportTable
                search={search}
                selected={selected}
                loading={isLoading}
                data={supportData?.data as SupportTicket[]}
              />
            </section>
          </aside>
          {showFilter && (
            <section className="absolute z-10 right-0 top-[30px] pb-[100px]">
              <SupportFilter
                setSelected={setSelected}
                selected={selected}
                onClose={() => setShowFilter(false)}
              />
            </section>
          )}
        </section>
        {supportData?.data && supportData.data.length > 0 && (
          <Pagination
            totalItems={supportData?.meta.total ?? 0}
            page={page}
            pageSize={limit}
            onPageChange={setPage}
            onPageSizeChange={setLimit}
          />
        )}
      </section>

      <Dialog open={!!modalType} onOpenChange={closeModal}>
        <DialogContent
          showCloseButton={false}
          className="min-w-[880px] w-full "
        >
          {/* Custom Close Button */}
          <DialogClose className="absolute right-4 top-4">
            <X className="text-[#A2185A] h-[24px] w-[24px] cursor-pointer" />
          </DialogClose>

          {/* Modal Content */}
          {modalType === "viewTicket" && <ViewTicket />}
          {modalType === "closeTicket" && <CloseTicket />}
          {modalType === "deleteTicket" && <DeleteTicket />}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default SupportPage;
