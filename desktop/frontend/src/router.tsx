import DetailedMatchPage from "@/app/(app)/dashboard/[id]/page";
import DashboardPage from "@/app/(app)/dashboard/page";
import LiveMatchPage from "@/app/(app)/live/page";
import LandingPage from "@/app/page";
import FourOhFour from "@/components/ui/FourOhFour/FourOhFour";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    ErrorBoundary: FourOhFour,
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   path: "/login/callback",
  //   element: <LoginCallbackPage />,
  // },
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
