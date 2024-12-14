import LoginCallbackPage from "@/app/(auth)/login/callback/page";
import LoginPage from "@/app/(auth)/login/page";
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
]);

export default router;
