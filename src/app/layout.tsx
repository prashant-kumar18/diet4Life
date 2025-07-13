// src/app/layout.tsx
import type { Metadata } from "next";
import "./global.scss";
import { HomeLayout } from "./components/HomeLayout";

export const metadata: Metadata = {
  title: "Patient Manager",
  description: "Manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
}