"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { getCurrentUser } from "@/lib/auth";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { extractRouterConfig } from "uploadthing/server";
import { TooltipProvider } from "./ui/tooltip";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <SessionProvider>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TooltipProvider>

        {children}
        </TooltipProvider>
      </SessionProvider>
    </ThemeContextProvider>
  );
};

export default Providers;
