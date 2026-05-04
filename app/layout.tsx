import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandon Williams | Software Engineer",
  description:
    "Professional portfolio for Brandon Williams, a software engineer based in Tokyo, Japan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
