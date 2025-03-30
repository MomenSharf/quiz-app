import { getCurrentUser } from "@/lib/auth";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { UserAvatar } from "../User/UserAvatar";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import Palette from "../Theme/Palette";
import SideBar from "./Sidebar";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="z-20 w-full px-2 py-1 flex bg-card shadow-sm">
      <div className=" w-full flex items-center justify-between  gap-1">
        <div className="flex gap-1">
          <SideBar
            user={session ? session.user : null}
            isLoggedIn={!!session?.user}
          />
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          {process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true" && (
            <div className="flex items-center text-xs font-bold">FAKE_DATA_VERSION</div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          <Palette />
          <SearchInput />
          <div className="hidden sm:block">
            {session?.user ? (
              <>
                <UserAvatar user={session.user} className="w-8 h-8" />
              </>
            ) : (
              <>
                <Link
                  href="/register?callbackUrl=/"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "text-xs rounded-full px-5"
                  )}
                >
                  SIGN UP NEW
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
