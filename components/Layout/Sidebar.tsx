'use client'
import { DescktopSideBarItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {

  const pathname = usePathname();

  return (
    <nav className="hidden md:flex bg-[var(--navbar)] text-primary-foreground px-1 py-2">
      <div className=" flex flex-col gap-3 w-full">
      <div className=" flex flex-col gap-3 w-full">
      {DescktopSideBarItems.map((item) => {
        return (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              "group flex gap-2 text-sm w-full justify-start hover:text-primary py-2 px-3 rounded-md hover:bg-[var(--navbar-item-active)] transition-colors",
              {
                "bg-[var(--navbar-item-active)]": pathname === item.route,
              }
            )}
          >
            <span>
              {
                <item.icon
                  className={cn(
                    "w-5 h-5 text-primary-foreground fill-primary-foreground group-hover:fill-primary",
                    {
                      "fill-primary":
                        pathname === item.route &&
                        pathname.startsWith(item.route),
                    }
                  )}
                />
              }
            </span>
            <span
              className={cn(
                "text-gray-400 group-hover:text-primary-foreground",
                {
                  "text-primary-foreground":
                    pathname === item.route || pathname.startsWith(item.route),
                }
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
      </div>
    </nav>
  );
}
