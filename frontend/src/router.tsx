import DashboardPage from "@/app/(app)/dashboard/page";
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
]);

export default router;
