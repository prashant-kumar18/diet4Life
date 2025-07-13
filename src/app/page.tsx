'use client'
import { Content, Theme } from "@carbon/react";
import { HeaderComponent } from "./components/HeaderComponent";
import ContextProvider from "./components/ContextProvider";

export default function Home({ children }: { children: React.ReactNode }) {

  return <Theme theme="g100">
    <ContextProvider>
    <HeaderComponent />
    <Content>
      {children}
    </Content>
    </ContextProvider>
  </Theme>
}