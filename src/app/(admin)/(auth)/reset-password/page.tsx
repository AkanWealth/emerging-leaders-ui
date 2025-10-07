import { Suspense } from "react";
import ResetPassword from "./ResetPasswordPageClient";
import { BeatLoader } from "react-spinners";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div>
          <BeatLoader size={8} color="#fff" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
