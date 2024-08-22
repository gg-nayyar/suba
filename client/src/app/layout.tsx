import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Icons from "../app/component/icons"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUBA",
  description: "Suba application wowowowowow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
