import { TabsContent } from "@/components/ui/tabs";
import UserReportTable from "./Tables/UserReportTable";

const UserReportTab = () => {
  return (
    <TabsContent value="user-report" className="flex-1 flex min-h-96">
      <UserReportTable />
    </TabsContent>
  );
};

export default UserReportTab;
