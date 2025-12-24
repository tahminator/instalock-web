import { createBrowserRouter } from "react-router-dom";

import DetailedMatchPage from "@/app/(app)/dashboard/[id]/page";
import DashboardPage from "@/app/(app)/dashboard/page";
import LiveMatchPage from "@/app/(app)/live/page";
import UserProfilePage from "@/app/(app)/search/[puuid]/page";
import SearchPage from "@/app/(app)/search/page";
import LandingPage from "@/app/page";
import FourOhFour from "@/components/ui/FourOhFour/FourOhFour";

const router = createBrowserRouter([
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
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/search/:puuid",
    element: <UserProfilePage />,
  },
]);

export default router;
