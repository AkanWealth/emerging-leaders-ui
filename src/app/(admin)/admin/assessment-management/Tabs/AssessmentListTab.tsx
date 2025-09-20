"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import AssessmentListTable from "../AssessmentListTable";

const AssessmentListTab = () => {
  return (
    <TabsContent value="assessment-list" className="flex-1 min-h-0 h-full">
      <Card className="h-full p-0">
        <CardContent className="grid gap-6 min-h-0 h-full p-5">
          {/* TODO: add actual data sync-check condition */}
          {/* {true ? <AssessmentListTable /> : <ContentManagementTable />} */}
          <AssessmentListTable />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AssessmentListTab;
