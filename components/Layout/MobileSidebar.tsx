"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { UserAvatarImage } from "../User/UserAvatar";
import { User } from "@prisma/client";
import { MobileSideBarItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SignOut from "../Auth/SignOut";
type MobileSideBarProps = {
  user: Pick<User, "image" | "email" | "name">;
  isLoggedIn: boolean;
};

export default function MobileSideBar({
  user,
  isLoggedIn,
}: MobileSideBarProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden mx-2">
        <Button variant="outline" size="icon">
          <Menu className="w-5 h-5 " />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col bg-[var(--navbar)] text-primary-foreground border-none p-0"
      >
        <SheetHeader className="bg-[#252834]">
          {isLoggedIn ? (
            <div className="flex gap-3 p-5 items-center">
              <UserAvatarImage imageUrl={user.image} />
              <div className="flex flex-col text-start max-w-32">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="font-semibold truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="text-xs mt-10 w-full p-3">

            <SheetClose  asChild>

              <Link
                href="/sign-up"
                className={cn(buttonVariants({ size: "sm" }), 'w-full')}
                >
                SIGN UP NEW
              </Link>
            </SheetClose>
            </div>
          )}
        </SheetHeader>
        <div className="flex-1 flex flex-col gap-3 w-full py-3 px-1">
          {MobileSideBarItems.map((item) => {
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
                      "text-gray-400 group-hover:text-primary-foreground",
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
          {isLoggedIn && <SignOut className="w-full" variant="ghost" />}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
