import Navbar from "@/app/(app)/_components/Navbar";
import DashboardContent from "@/app/(app)/dashboard/_components/DashboardContent";
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
