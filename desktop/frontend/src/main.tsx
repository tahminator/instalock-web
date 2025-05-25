import QueryClientProvider from "@/lib/query-provider";
import router from "@/router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <MantineProvider
        forceColorScheme="dark"
        theme={{
          colors: {
            "deep-red": [
              "#ffeaec",
              "#fdd4d6",
              "#f4a7ac",
              "#ec777e",
              "#e64f57",
              "#e3353f",
              "#e22732",
              "#c91a25",
              "#b31220",
              "#9e0419",
            ],
          },
        }}
      >
        <RouterProvider router={router} />
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
