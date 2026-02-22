import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robot Toast - Notification Library",
  description: "A delightful toast notification library with robot characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-black dark:text-white transition-colors`}>
        <ThemeProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
              <header className="sticky top-0 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-black/95 px-6 py-4 flex items-center justify-between z-40">
                <h1 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Documentation
                </h1>
                <ThemeToggle />
              </header>
              <main className="min-h-screen bg-white dark:bg-black">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
