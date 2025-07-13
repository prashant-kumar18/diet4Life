'use client';

import { Content, Theme } from "@carbon/react";
import ContextProvider from "./ContextProvider";
import { HeaderComponent } from "./HeaderComponent";



export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme="g100">
      <ContextProvider>
        <HeaderComponent />
        <Content>{children}</Content>
      </ContextProvider>
    </Theme>
  );
}