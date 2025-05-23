"use client";
import { DESKTOP_SIDEBAR_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icons } from "../icons";
import Logo from "./Logo";
export default function Sidebar() {
  const pathname = usePathname();
  const [state, setStat] = useState<"collapsed" | "expanded">("collapsed");

  return (
    <div className="hidden sm:flex h-full flex-col w-14 z-20">
      <nav
        onMouseEnter={() => setStat("expanded")}
        onMouseLeave={() => setStat("collapsed")}
        data-state={state}
        className="fixed group bg-[var(--navbar)] z-10 h-full w-14 data-[state=expanded]:w-[13rem] data-[state=expanded]:shadow-xl transition-width duration-200 hide-scrollbar flex flex-col justify-between overflow-y-auto no-scrollbar"
      >
        <ul className="flex flex-col px-2 pt-32">
          {DESKTOP_SIDEBAR_ITEMS.map((item) => {
            const isCurrentRoute =
              pathname === item.route && pathname.startsWith(item.route);
            return (
              <Link
                href={item.route}
                key={item.label}
                className="relative h-10 w-10 group-data-[state=expanded]:w-full transition-all duration-200 flex items-center rounded group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2 hover:bg-[var(--navbar-item-active)] group/item"
              >
                <span className="absolute left-0 top-0 flex rounded h-10 w-10 items-center justify-center  transition-colors">
                  {
                    <item.icon
                      className={cn(
                        "w-5 h-5 text-primary-foreground fill-primary-foreground group-hover/item:fill-primary",
                        {
                          "fill-primary": isCurrentRoute,
                        }
                      )}
                    />
                  }
                </span>
                <span className="min-w-[128px] text-sm text-primary-foreground absolute left-7 group-data-[state=expanded]:left-12 opacity-0 group-data-[state=expanded]:opacity-100 transition-all">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
