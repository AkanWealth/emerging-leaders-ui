import { Suspense } from "react";
import { BeatLoader } from "react-spinners";
import UserManagementPage from "./UserManagementClient";

export default function UserManagement() {
  return (
    <Suspense
      fallback={
        <div>
          <BeatLoader size={8} color="#fff" />
        </div>
      }
    >
      <UserManagementPage />
    </Suspense>
  );
}
