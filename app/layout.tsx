import "@/app/globals.css";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import Providers from "@/components/Providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuizzesUp",
  description:
    "QuizzesUp is an interactive quiz platform where users can test their knowledge, create quizzes, and compete with friends.",
  keywords: [
    "quiz",
    "trivia",
    "knowledge",
    "test",
    "online quiz",
    "fun quizzes",
    "QuizzesUp",
  ],
  authors: [{ name: "Momen Sharf", url: "https://quizzesup.vercel.app" }],
  openGraph: {
    title: "QuizzesUp - Test Your Knowledge",
    description: "Join QuizzesUp and challenge yourself with exciting quizzes!",
    url: "https://quizzesup.vercel.app",
    siteName: "QuizzesUp",
    images: [
      {
        url: "/assets/images/quiz-banner.webp",
        width: 1200,
        height: 630,
        alt: "QuizzesUp - Test Your Knowledge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizzesUp - Test Your Knowledge",
    description: "Join QuizzesUp and challenge yourself with exciting quizzes!",
    images: ["/assets/images/quiz-banner.webp"],
  },
  metadataBase: new URL("https://quizzesup.vercel.app"),
  robots: "index, follow",
  icons: {
    icon: "./favicon.ico",
    apple: "/assets/images/apple-touch-icon.webp",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        {children}
        <Toaster />
        <Sonner />
      </Providers>
    </html>
  );
}
