"use client";
import { DESKTOP_SIDEBAR_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icons } from "../icons";
export default function Sidebar() {
  const pathname = usePathname();
  const [state, setStat] = useState<"collapsed" | "expanded">("collapsed");

  return (
    <div className="hidden sm:flex flex-col w-14 z-30">
      <nav
        onMouseEnter={() => setStat("expanded")}
        onMouseLeave={() => setStat("collapsed")}
        data-state={state}
        className="group bg-[var(--navbar)] py-2 z-10 h-full w-14 data-[state=expanded]:w-[13rem] data-[state=expanded]:shadow-xl transition-width duration-200 hide-scrollbar flex flex-col justify-between overflow-y-auto scrollbar-hide"
      >
        <ul className="flex flex-col gap-y-1 justify-start px-2 relative">
          <Link
            href="/"
            className="relative h-16 w-10 mt-2 group-data-[state=expanded]:w-10 transition-all duration-200 flex items-center justify-center rounded group-data-[state=collapsed]:justify-center group-data-[state=expanded]:-space-x-2 group/item"
          >
            <span className="relative left-0 right-0 bg-primary rounded-full flex h-10 w-10 items-center justify-center  transition-colors">
              <Icons.q className="w-5 h-5 text-primary-foreground fill-primary-foreground " />
            </span>
            <span className="pt-3 min-w-[128px] text-sm text-primary-foreground absolute left-7 group-data-[state=expanded]:left-12 opacity-0 group-data-[state=expanded]:opacity-100 transition-all">
              uizzes<span className="text-lg font-semibold">Up</span>
            </span>
          </Link>
          <div className="flex flex-col mt-10">

          {DESKTOP_SIDEBAR_ITEMS.map((item) => {
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
                          "fill-primary":
                            pathname === item.route &&
                            pathname.startsWith(item.route),
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
          </div>
        </ul>
      </nav>
    </div>
  );
}
