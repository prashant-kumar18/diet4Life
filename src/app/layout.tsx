import type { Metadata } from "next";
import "./global.scss";
import Home from "./page";

export const metadata: Metadata = {
  title: "Patient Manager",
  description: "Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Home>
        {children}
        </Home>
      </body>
    </html>
  );
}
