import { getCurrentUser } from "@/lib/auth";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { UserAvatar } from "../User/UserAvatar";
import MobileSideBar from "./MobileSidebar";
import SearchInput from "./SearchInput";
import Logo from "./Logo";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="z-20 w-full p-2 flex bg-card shadow-sm">
      <div className="sm:hidden w-full flex items-center  gap-1">
        <MobileSideBar
          user={session ? session.user : null}
          isLoggedIn={!!session?.user}
        />
        <Logo />

        <SearchInput />
      </div>
      <div className="hidden container sm:flex  items-center justify-end gap-3">
        {/* <Logo /> */}
        <SearchInput />
        {session?.user ? (
          <>
            <UserAvatar user={session.user} />
          </>
        ) : (
          <>
            <Link
              href="/login"
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
    </header>
  );
}
