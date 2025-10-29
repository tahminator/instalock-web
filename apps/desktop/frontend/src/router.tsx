import DetailedMatchPage from "@/app/(app)/dashboard/[id]/page";
import DashboardPage from "@/app/(app)/dashboard/page";
import LiveMatchPage from "@/app/(app)/live/page";
import LandingPage from "@/app/page";
import FourOhFour from "@/components/ui/FourOhFour/FourOhFour";
import { createHashRouter } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <LandingPage />,
    ErrorBoundary: FourOhFour,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/:id?",
    element: <DetailedMatchPage />,
  },
  {
    path: "/live",
    element: <LiveMatchPage />,
  },
]);

export default router;
