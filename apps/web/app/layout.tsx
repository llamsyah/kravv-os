import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home · ALLVERRA ROOM",
  description: "Study, Health, and Context in ALLVERRA ROOM.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
