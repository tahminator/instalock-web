import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import QueryProvider from "./src/lib/client/query";
import Router from "./src/lib/client/router";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <MantineProvider defaultColorScheme="dark">
    <QueryProvider>
      <Notifications />
      <Router />
    </QueryProvider>
  </MantineProvider>
  // </StrictMode>
);
