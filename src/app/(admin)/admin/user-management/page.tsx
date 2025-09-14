import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter, Search } from "lucide-react";
import UserRankingTable from "../dashboard/UserRankingTable";
import AdminList from "./AdminList";
import UserList from "./UserList";

const UserManagementPage = () => {
  return (
    <Tabs defaultValue="user" className="flex flex-col gap-[32px]">
      <section className="flex items-center justify-between">
        <section className="flex flex-col gap-[4px]">
          <h2 className="text-[#2A2829] font-medium text-[24px]">
            User Management
          </h2>
          <p className="text-[#65605C] font-normal text-[16px]">
            Monitor, filter, and manage users effectively.
          </p>
        </section>
        <TabsContent className="flex justify-end" value="admin">
          <Button className="bg-[#A2185A] w-[162px] cursor-pointer hover:bg-[#A2185A] rounded-[16px] h-[48px] font-medium text-[16px] leading-[24px]">
            Add User
          </Button>
        </TabsContent>
      </section>
      <section className="">
        <section className="bg-[#FFFFFF] pb-[8px] pt-[12px] rounded-[12px] shadow relative">
          <aside className="flex px-[20px] items-center justify-between ">
            <TabsList className="h-[40px] w-[267px] bg-inherit border-none p-0 flex items-center">
              <TabsTrigger
                value="user"
                className="flex-1 text-[20px] cursor-pointer leading-[30px] font-medium data-[state=active]:text-[#A2185B] data-[state=active]:shadow-none text-[#2A2829]"
              >
                User List
              </TabsTrigger>

              <div className="h-full w-[1px] bg-[#E5E5E5]" />

              <TabsTrigger
                value="admin"
                className="flex-1 text-[20px] cursor-pointer leading-[30px] font-medium data-[state=active]:text-[#A2185B] data-[state=active]:shadow-none text-[#2A2829]"
              >
                Admin List
              </TabsTrigger>
            </TabsList>

            <aside>
              <section className="flex items-center gap-[16px]">
                <div className="rounded-[12px] bg-[#F9F9F7] relative min-w-[385px] h-[48px] flex items-center justify-center py-[12px] px-[16px]">
                  <Search className="absolute left-3 text-[#928F8B] h-[19.5px] w-[19.5px]" />
                  <input
                    className="border-none outline-none pl-[40px] w-full text-[14px] text-[#928F8B]"
                    type="text"
                    placeholder="Search by name, role, date added..."
                  />
                </div>
                <Button
                  // onClick={() => setShowFilter((prev) => !prev)}
                  className="flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] hover:text-[#F9F9F7] hover:bg-[#65605C] hover:shadow-2xl"
                >
                  <ListFilter className="h-[12.75px] w-[22.5px]" />
                  <span>Filter</span>
                </Button>
              </section>
            </aside>
          </aside>
          {/* {showFilter && (
            <TabsContent
              className="absolute z-10 right-0 top-[100px] pb-[100px]"
              value="ranking"
            >
              <UserRankingFilter onClose={() => setShowFilter(false)} />
            </TabsContent>
          )} */}
          <aside>
            <TabsContent
              className="border-t mt-[15px] px-[20px] rounded-t-[12px] min-h-[500px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
              value="user"
            >
              <UserList />
            </TabsContent>
            <TabsContent
              className="border-t mt-[15px] px-[20px] rounded-t-[12px]  min-h-[500px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
              value="admin"
            >
              <AdminList />
            </TabsContent>
          </aside>
          {/* </Tabs> */}
        </section>
      </section>
    </Tabs>
  );
};

export default UserManagementPage;
