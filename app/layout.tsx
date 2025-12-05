import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/providers/AuthProvider";
import FooterWrapper from "@/components/FooterWrapper";
import GridBackground from "@/components/GridBackground";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "UniVerse | IT FEST 2025",
  description: "Единый каталог университетов с AI-помощником",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <GridBackground />

            <Navbar />

            <main className="flex-1 flex flex-col relative">{children}</main>

            <FooterWrapper />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
