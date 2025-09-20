"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import EmptyUserGrowthTab from "../EmptyUserGrowthTab";

const UserReportTab = () => {
  type LabelType = "12-months" | "30-days" | "7-days";

  const [activeUserGrowthTab, setActiveUserGrowthTab] =
    useState<LabelType>("12-months");

  return (
    <TabsContent value="user-report" className="flex-1 min-h-0 h-full">
      <Card className="h-full min-h-0 flex-1 relative">
        <CardHeader>
          <h2 className="text-2xl font-semibold mb-3">0</h2>
          <p>0% no records yet</p>
        </CardHeader>

        <CardContent className="grid gap-6 min-h-0 h-full">
          <Tabs
            defaultValue="12-months"
            value={activeUserGrowthTab}
            onValueChange={(val) => setActiveUserGrowthTab(val as LabelType)}
          >
            <TabsList className="absolute top-6 right-6">
              <TabsTrigger value="12-months">12 months</TabsTrigger>
              <TabsTrigger value="30-days">30 days</TabsTrigger>
              <TabsTrigger value="7-days">7 days</TabsTrigger>
            </TabsList>

            <TabsContent value="12-months" className="flex-1 min-h-0 h-96">
              <EmptyUserGrowthTab label={activeUserGrowthTab} />
            </TabsContent>
            <TabsContent value="30-days" className="flex-1 min-h-0 h-full">
              <EmptyUserGrowthTab label={activeUserGrowthTab} />
            </TabsContent>
            <TabsContent value="7-days" className="flex-1 min-h-0 h-full">
              <EmptyUserGrowthTab label={activeUserGrowthTab} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UserReportTab;
