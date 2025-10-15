import { Suspense } from "react";
import { BeatLoader } from "react-spinners";
import AssessmentManagementClient from "./AssessmentManagementClient";

export default function AssessmentManagementPage() {
  return (
    <Suspense
      fallback={
        <div>
          <BeatLoader size={8} color="#fff" />
        </div>
      }
    >
      <AssessmentManagementClient />
    </Suspense>
  );
}
