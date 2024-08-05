import { getCurrentUser } from "@/lib/auth";
import Logo from "./Logo";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { UserAvatar } from "../User/UserAvatar";
import MobileSideBar from "./MobileSidebar";
import ThemeMode from "../Theme/ThemeMode";
import Palette from "../Theme/Palette";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="w-full flex bg-card justify-between items-center gap-3 overflow-hidden shadow-sm">
      <MobileSideBar
        user={{
          email: session?.user.email || "",
          image: session?.user.image || null,
          name: session?.user.name || null,
        }}
        isLoggedIn={!!session?.user}
      />
      <Link href="/" className="cursor-pointer">
        <Logo />
      </Link>
      <div className="hidden sm:flex justify-center items-center px-3">
        {session?.user ? (
          <>
            <UserAvatar
              isLoggedIn={!!session?.user}
              user={{
                name: session?.user.name || null,
                email: session?.user.email || "",
                image: session?.user.image || null,
              }}
            />
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

// rounded-br-xl rounded-bl-xl sm:rounded-bl-none sm:rounded-tr-xl sm:rounded-br-xl
