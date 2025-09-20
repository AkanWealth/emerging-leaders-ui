import FooterBar from "../../shared/Footer/FooterBar";
import AssessmentTabs from "./Tabs/AssessmentTabs";

const AssessmentManagementPage = () => {
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-8">
      <section className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Assessment Management</h1>
          <p className="text-foreground">
            Create, filter, and manage assessment questions.
          </p>
        </div>
      </section>

      <section className="flex-1 min-h-0 flex flex-col rounded-xl border border-border-secondary bg-red-500 p-1 white shadow-2xs overflow-hidden">
        <AssessmentTabs />
      </section>

      <FooterBar />
    </div>
  );
};

export default AssessmentManagementPage;
