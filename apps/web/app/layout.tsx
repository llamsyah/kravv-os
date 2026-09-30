import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KRAVV OS · Your personal space",
  description:
    "A quiet place to bring your day together. Local-first KRAVV OS prototype.",
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
