"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DESKTOP_SIDEBAR_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOut from "../Auth/SignOut";
import { Icons } from "../icons";
import { UserAvatarImage } from "../User/UserAvatar";
import { User } from "next-auth";
type MobileSideBarProps = {
  user: User | null;
  isLoggedIn: boolean;
};

export default function SideBar({ user, isLoggedIn }: MobileSideBarProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon">
          <Icons.menu className="w-5 h-5 stroke-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col bg-[var(--navbar)] text-primary-foreground border-none p-0"
      >
        <SheetHeader className="bg-[#252834]">
          {user ? (
            <div className="flex gap-3 p-5 items-center">
              <UserAvatarImage user={user} />
              <div className="flex flex-col text-start max-w-32">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="font-semibold truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="text-xs mt-10 w-full p-3">
              <SheetClose  asChild>
                <div className="flex gap-2">
                  <Link
                    href="/login?callbackUrl=/"
                    className={cn(buttonVariants({ size: "sm" }), "w-full")}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register?callbackUrl=/"
                    className={cn(buttonVariants({ size: "sm" }), "w-full")}
                  >
                    Sign Up
                  </Link>
                </div>
              </SheetClose>
            </div>
          )}
        </SheetHeader>
        <div className="flex-1 flex flex-col gap-3 w-full py-3 px-1">
          {DESKTOP_SIDEBAR_ITEMS.map((item) => {
            return (
              <SheetClose key={item.label} asChild>
                <Link
                  href={item.route}
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
                      "text-gray-light group-hover:text-primary-foreground",
                      {
                        "text-primary-foreground":
                          pathname === item.route ||
                          pathname.startsWith(item.route),
                      }
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </SheetClose>
            );
          })}
        </div>
        <SheetFooter className="flex justify-center p-2">
          {isLoggedIn && (
            <SignOut
              className="w-full hover:bg-destructive hover:text-white group"
              variant="ghost"
              iconClassName="group-hover:text-white"
            />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
