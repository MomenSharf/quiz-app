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
    <div className="hidden sm:flex flex-col w-14 z-30">
      <nav
        onMouseEnter={() => setStat("expanded")}
        onMouseLeave={() => setStat("collapsed")}
        data-state={state}
        className="group bg-[var(--navbar)] py-2 z-10 h-full w-14 data-[state=expanded]:w-[13rem] data-[state=expanded]:shadow-xl transition-width duration-200 hide-scrollbar flex flex-col justify-between overflow-y-auto no-scrollbar"
      >
        <div className="flex flex-col gap-20 h-full px-2 relative">
          <Link href="/" className="relative flex items-center w-fit mx-2 my-3">
            <span className="absolute bg-white w-[95%] h-[95%] rounded-full -z-[2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Logo />
          </Link>
          <ul className="flex flex-col">
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
                            "fill-[var(--navbar)] group-hover/item:stroke-primary group-hover/item:fill-[var(--navbar-item-active)]":
                              item.label === "Search",
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
        </div>
      </nav>
    </div>
  );
}
