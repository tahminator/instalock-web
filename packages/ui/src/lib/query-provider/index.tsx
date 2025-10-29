import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <QCP client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QCP>
  );
}

export default QueryClientProvider;
