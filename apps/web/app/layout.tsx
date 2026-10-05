import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home · KRAVV OS",
  description: "Study, health, and events in KRAVV OS.",
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
