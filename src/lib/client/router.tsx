import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../../app/page";
import ErrorPage from "@/components/ui/error-page";
import LoginPage from "@/app/login/page";
import CallbackPage from "@/app/login/callback/page";
import DashboardPage from "@/app/dashboard/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />, // Errors will bubble up to this root component
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/callback",
    element: <CallbackPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
