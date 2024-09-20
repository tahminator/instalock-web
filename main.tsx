import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import Router from "./src/lib/client/router";
import QueryProvider from "./src/lib/client/query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <QueryProvider>
        <Router />
      </QueryProvider>
    </MantineProvider>
  </StrictMode>
);
