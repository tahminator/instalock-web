import Navbar from "@/app/(app)/_components/_navbar";
import DashboardContent from "@/app/(app)/dashboard/_components/_dashboard-content";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<CenteredSpinner />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
