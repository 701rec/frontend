import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/providers/AuthProvider";
import FooterWrapper from "@/components/FooterWrapper";
import GridBackground from "@/components/GridBackground";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://universe.lat/"),

  title: {
    default: "UniVerse | IT FEST 2025",
    template: "%s | UniVerse",
  },
  description:
    "Единый каталог университетов Казахстана с AI-помощником. Найди свой идеальный вуз, узнай про общежития и гранты.",

  keywords: [
    "Университеты Казахстана",
    "IT FEST 2025",
    "Поступление",
    "Гранты",
    "IITU",
    "Единый каталог вузов",
    "AI ментор",
  ],

  openGraph: {
    title: "UniVerse — Твой путь к высшему образованию",
    description:
      "Умный поиск университетов, сравнение программ и AI-консультант.",
    url: "/",
    siteName: "UniVerse",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UniVerse Preview",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
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
