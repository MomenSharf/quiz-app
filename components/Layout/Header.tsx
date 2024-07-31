import { getCurrentUser } from "@/lib/auth";
import Logo from "./Logo";

import Link from "next/link";
import Palette from "../Theme/Palette";
import ThemeMode from "../Theme/ThemeMode";
import { UserAvatar } from "../User/UserAvatar";
import { Triangle } from "lucide-react";
import { Button } from "../ui/button";
import MobileSideBar from "./MobileSidebar";

export default async function Header() {
  const session = await getCurrentUser();

  return (
    <header className="w-full flex  bg-card  justify-between items-center gap-4 overflow-hidden shadow-sm">
      <MobileSideBar
        user={{
          email: session?.user.email || '', 
          image: session?.user.image || null,
          name: session?.user.name || null,
        } }
        isLoggedIn={!!session?.user}
      />
      <Link href="/" className="cursor-pointer">
        <Logo />
      </Link>
      <div className="hidden md:flex justify-center items-center px-3">
        {session?.user ? (
          <UserAvatar
            isLoggedIn={!!session?.user}
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
            className="w-10 h-10"
          />
        ) : (
          <Button size="sm" className="text-xs rounded-full px-5">
            SIGN UP NEW
          </Button>
        )}
      </div>
    </header>
  );
}

// rounded-br-xl rounded-bl-xl sm:rounded-bl-none sm:rounded-tr-xl sm:rounded-br-xl
