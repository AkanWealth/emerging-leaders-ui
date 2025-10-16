"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { ListFilter, Search, X } from "lucide-react";
import AdminList from "./AdminList";
import UserList from "./UserList";
import { manageUserModalStore, userModalStore } from "@/store/userModalStore";
import EditAdmin from "./AdminTab/EditAdmin";
import DeactivateAdmin from "./AdminTab/DeactivateAdmin";
import ResendInviteAdmin from "./AdminTab/ResendInviteAdmin";
import ReactivateAdmin from "./AdminTab/ReactivateAdmin";
import ReactivateUser from "./UserTab/ReactivateUser";
import DeactivateUser from "./UserTab/DeactivateUser";
import CreateAdmin from "./AdminTab/CreateAdmin";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserManagementFilter from "./UserManagementFilter";
import {
  AdminStatus,
  useAdminList,
} from "@/hooks/admin/user-management/Admins/useAdminList";
import { useUserList } from "@/hooks/admin/user-management/Users/useUserList"; // Assuming this exists
import Pagination from "@/shared/Pagination/Pagination";
import DeleteAdmin from "./AdminTab/DeleteAdmin";

type TabValue = "user" | "admin";

const UserManagementPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { modalType, closeModal } = userModalStore();
  const { modalType: userModalType, closeModal: closeUserModalType } =
    manageUserModalStore();

  // Get initial tab from URL or default to "user"
  const [activeTab, setActiveTab] = useState<TabValue>(
    (searchParams.get("tab") as TabValue) || "user"
  );

  // Admin state
  const [adminSelected, setAdminSelected] = useState<AdminStatus | null>(null);
  const [adminSearchInput, setAdminSearchInput] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [adminPage, setAdminPage] = useState(1);
  const [adminLimit, setAdminLimit] = useState(8);
  const [adminShowFilter, setAdminShowFilter] = useState(false);

  // User state
  const [userSelected, setUserSelected] = useState<AdminStatus | null>(null); // Adjust type as needed
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userLimit, setUserLimit] = useState(8);
  const [userShowFilter, setUserShowFilter] = useState(false);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    const newTab = value as TabValue;
    setActiveTab(newTab);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.push(`?${params.toString()}`, { scroll: false });

    // Reset state for the tab being switched away from
    if (newTab === "user") {
      // Reset admin state
      setAdminSelected(null);
      setAdminSearchInput("");
      setAdminSearch("");
      setAdminPage(1);
      setAdminLimit(8);
      setAdminShowFilter(false);
    } else {
      // Reset user state
      setUserSelected(null);
      setUserSearchInput("");
      setUserSearch("");
      setUserPage(1);
      setUserLimit(8);
      setUserShowFilter(false);
    }
  };

  // Admin search debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setAdminSearch(adminSearchInput);
      setAdminPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [adminSearchInput]);

  // User search debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setUserSearch(userSearchInput);
      setUserPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [userSearchInput]);

  // Fetch admin data
  const {
    data: adminData = { data: [], meta: { total: 0 } },
    isLoading: isAdminLoading,
  } = useAdminList({
    search: adminSearch,
    status: adminSelected ?? undefined,
    page: adminPage,
    limit: adminLimit,
  });

  // Fetch user data - adjust hook name and params as needed
  const {
    data: userData = { data: [], meta: { total: 0 } },
    isLoading: isUserLoading,
  } = useUserList({
    search: userSearch,
    status: userSelected ?? undefined,
    page: userPage,
    limit: userLimit,
  });

  const currentSearchInput =
    activeTab === "admin" ? adminSearchInput : userSearchInput;
  const currentShowFilter =
    activeTab === "admin" ? adminShowFilter : userShowFilter;
  const currentSelected = activeTab === "admin" ? adminSelected : userSelected;

  const handleSearchChange = (value: string) => {
    if (activeTab === "admin") {
      setAdminSearchInput(value);
    } else {
      setUserSearchInput(value);
    }
  };

  const handleFilterToggle = () => {
    if (activeTab === "admin") {
      setAdminShowFilter((prev) => !prev);
    } else {
      setUserShowFilter((prev) => !prev);
    }
  };

  const handleFilterClose = () => {
    if (activeTab === "admin") {
      setAdminShowFilter(false);
    } else {
      setUserShowFilter(false);
    }
  };

  const handleSelectedChange = (value: AdminStatus | null) => {
    if (activeTab === "admin") {
      setAdminSelected(value);
    } else {
      setUserSelected(value);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="flex flex-col gap-[32px] min-h-screen "
    >
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
          <Button
            onClick={() => userModalStore.getState().openModal("createAdmin")}
            className="bg-[#A2185A] w-[162px] cursor-pointer hover:bg-[#A2185A] rounded-[16px] h-[48px] font-medium text-[16px] leading-[24px]"
          >
            Add User
          </Button>
        </TabsContent>
      </section>
      <section className="flex-1 flex flex-col">
        <section className="bg-[#FFFFFF] flex-1 h-full pb-[8px] pt-[12px] rounded-[12px] shadow relative">
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
                    value={currentSearchInput}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="border-none outline-none pl-[40px] w-full text-[14px] text-[#928F8B]"
                    type="text"
                    placeholder="Search by name, role, date added..."
                  />
                </div>
                <Button
                  onClick={handleFilterToggle}
                  className="cursor-pointer flex items-center gap-[12px] h-[48px] bg-[#F9F9F7] text-[#65605C] hover:text-[#F9F9F7] hover:bg-[#65605C] hover:shadow-2xl"
                >
                  <ListFilter className="h-[12.75px] w-[22.5px]" />
                  <span>Filter</span>
                </Button>
              </section>
            </aside>
          </aside>
          {currentShowFilter && (
            <UserManagementFilter
              onClose={handleFilterClose}
              setSelected={handleSelectedChange}
              selected={currentSelected}
            />
          )}
          <aside>
            <TabsContent
              className="border-t mt-[15px] px-[20px] rounded-t-[12px] min-h-[500px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
              value="user"
            >
              <UserList isLoading={isUserLoading} userData={userData.data} />
            </TabsContent>
            <TabsContent
              className="border-t mt-[15px] px-[20px] rounded-t-[12px]  min-h-[500px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
              value="admin"
            >
              <AdminList
                isLoading={isAdminLoading}
                adminData={adminData.data}
              />
            </TabsContent>
          </aside>
        </section>
        <section className="mt-[40px] mb-[10px]">
          {activeTab === "user" &&
            userData?.data &&
            userData.data.length > 0 && (
              <Pagination
                totalItems={userData?.meta?.total ?? 0}
                page={userPage}
                pageSize={userLimit}
                onPageChange={setUserPage}
                onPageSizeChange={setUserLimit}
              />
            )}
          {activeTab === "admin" &&
            adminData?.data &&
            adminData.data.length > 0 && (
              <Pagination
                totalItems={adminData?.meta?.total ?? 0}
                page={adminPage}
                pageSize={adminLimit}
                onPageChange={setAdminPage}
                onPageSizeChange={setAdminLimit}
              />
            )}
        </section>
      </section>
      <TabsContent className="relative" value="admin">
        <Dialog open={!!modalType} onOpenChange={closeModal}>
          <DialogContent
            showCloseButton={false}
            className="min-w-[880px] w-full "
          >
            <DialogClose className="absolute right-4 top-4">
              <X className="text-[#A2185A] h-[24px] w-[24px] cursor-pointer" />
            </DialogClose>

            {modalType === "createAdmin" && <CreateAdmin />}
            {modalType === "editAdmin" && <EditAdmin />}
            {modalType === "resendInvite" && <ResendInviteAdmin />}
            {modalType === "deactivate" && <DeactivateAdmin />}
            {modalType === "reactivate" && <ReactivateAdmin />}
            {modalType === "deleteAdmin" && <DeleteAdmin />}
          </DialogContent>
        </Dialog>
      </TabsContent>
      <TabsContent className="relative" value="user">
        <Dialog open={!!userModalType} onOpenChange={closeUserModalType}>
          <DialogContent
            showCloseButton={false}
            className="min-w-[880px] w-full "
          >
            <DialogClose className="absolute right-4 top-4">
              <X className="text-[#A2185A] h-[24px] w-[24px] cursor-pointer" />
            </DialogClose>

            {userModalType === "deactivateUser" && <DeactivateUser />}
            {userModalType === "reactivateUser" && <ReactivateUser />}
          </DialogContent>
        </Dialog>
      </TabsContent>
    </Tabs>
  );
};

export default UserManagementPage;
