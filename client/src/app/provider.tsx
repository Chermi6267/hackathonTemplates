"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { Suspense } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <Provider store={store}>{children}</Provider>
    </Suspense>
  );
};
