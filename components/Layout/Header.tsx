import { getCurrentUser } from "@/lib/auth";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { UserAvatar } from "../User/UserAvatar";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import Palette from "../Theme/Palette";
import MobileSidebar from "./MobileSidebar";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="fixed h-14 z-30 w-full p-2 flex bg-card shadow-sm">
      <div className=" w-full flex items-center justify-between  gap-1">
        <div className="flex gap-1">
          <MobileSidebar
            user={session ? session.user : null}
            isLoggedIn={!!session?.user}
          />

          <Link href="/" className="relative flex items-center w-fit mx-2">
            <span className="absolute bg-white w-[90%] h-[90%] rounded-full -z-[2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Logo />
          </Link>
          {process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true" && (
            <div className="flex items-center text-xs font-bold">
              FAKE_DATA_VERSION
            </div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          <SearchInput />
          <Palette />

          <div className="hidden sm:block">
            {session?.user ? (
              <>
                <UserAvatar user={session.user} className="w-8 h-8" />
              </>
            ) : (
              <div className="flex gap-1">
                <Link
                  href="/login?callbackUrl=/"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "text-xs rounded-full px-5"
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/register?callbackUrl=/"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "text-xs rounded-full px-5"
                  )}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
