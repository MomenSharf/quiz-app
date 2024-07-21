import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'


// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../public/font/Rubik/Rubik-VariableFont_wght.ttf",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <div className={myFont.className}>
          <div className="relative dark:bg-background dark:text-primary-foreground antialiased min-h-screen flex flex-col sm:flex-row w-full">
            <Navbar />
            {authModal}
            <main className="flex-1">{children}</main>
          </div>
        </div>
        <Toaster />  
        <Sonner />  
      </Providers>
    </html>
  );
}
