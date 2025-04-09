"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./query-client";
import { FC } from "react";

interface ReactQueryProviderProps extends React.PropsWithChildren {
  devTool?: boolean;
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({
  devTool,
  children,
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {devTool && <ReactQueryDevtools initialIsOpen={true} />}
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
