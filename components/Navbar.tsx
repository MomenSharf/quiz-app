import { getCurrentUser } from "@/lib/auth";
import Logo from "./Logo";
import { UserAvatar } from "./UserAvatar";
import ThemeMode from "./ThemeMode";
import Palette from "./Palette";
import Link from "next/link";

export default async function Navbar() {
  const session = await getCurrentUser();

  return (
    <nav className="flex sm:flex-col bg-[var(--nav-bar)]  justify-between pr-2 sm:pb-2 sm:pr-0 gap-4 overflow-hidden rounded-br-xl rounded-bl-xl sm:rounded-bl-none sm:rounded-tr-xl sm:rounded-br-xl ">
      <Link href='/' className="cursor-pointer">
      <Logo />
      </Link>
      <div className="flex sm:flex-col gap-4">
        <Palette />
        <ThemeMode />
      </div>
      <div className="flex justify-center items-center">
        <UserAvatar
          isLoggedIn={!!session?.user}
          user={{
            name: session?.user.name || null,
            image: session?.user.image || null,
          }}
          className=" w-10 h-10"
        />
      </div>
    </nav>
  );
}
