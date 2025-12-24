import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import "@mantine/core/styles.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import QueryClientProvider from "@/lib/query-provider";
import router from "@/router";

import "./index.css";

export class App {
  private static app() {
    return (
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
  }

  static render() {
    const root = document.getElementById("root");
    if (!root) throw new Error("No #root element found.");

    createRoot(root).render(this.app());
  }
}
