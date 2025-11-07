import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: "Discipline Companion",
  description:
    "Build disciplined habits with guided frameworks, actionable planners, and mindset tools."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-slate-950 text-slate-100 antialiased">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
