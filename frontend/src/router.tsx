import LoginCallbackPage from "@/app/(auth)/login/callback/page";
import LoginPage from "@/app/(auth)/login/page";
import DashboardPage from "@/app/(app)/dashboard/page";
import LandingPage from "@/app/page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/callback",
    element: <LoginCallbackPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

export default router;
