'use client'
import { ThemeContextProvider } from "@/context/ThemeContext";
import { getCurrentUser } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> =  ({ children }) => {
  
  return (
    <ThemeContextProvider>
      <SessionProvider>{children}</SessionProvider>
    </ThemeContextProvider>
  );
};

export default Providers;
