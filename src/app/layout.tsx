import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kosbu - Komunitas Persahabatan",
  description: "Komunitas persahabatan yang tumbuh bersama, bermain bersama, dan menciptakan kenangan tak terlupakan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
