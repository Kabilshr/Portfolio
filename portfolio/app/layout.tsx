import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ThemeController from "@/components/theme-controller";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kabil Shrestha | AI Student & Full-Stack Developer",
  description: "Portfolio of Kabil Shrestha - AI Student, Full-Stack Developer, and Tech Community Lead.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeController />
        <Navbar />
        <main className="page-content">
          {children}
        </main>
      </body>
    </html>
  );
}
