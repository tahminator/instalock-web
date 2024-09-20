import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../../app/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
