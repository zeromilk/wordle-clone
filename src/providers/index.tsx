"use client";

import { ReactQueryProvider } from "@/react-query";
import { PropsWithChildren } from "react";
import ModalProvider from "./ModalProvider";

const GlobalProviders = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <ModalProvider>{children}</ModalProvider>
    </ReactQueryProvider>
  );
};

export default GlobalProviders;
