import { Github, Plus, Settings, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";
import Link from "next/link";
import SignOut from "../Auth/SignOut";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Icons } from "../icons";
import { User } from "next-auth";

type UserAvatarProps = {
  isLoggedIn: boolean; // Check if user is logged in or not.
  user: User;
};
type UserAvatarImageProps = AvatarProps & {
  imageUrl: string | null;
};

export function UserAvatar({ isLoggedIn, user }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatarImage imageUrl={user.image || null} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-5 sm:ml-10">
        <DropdownMenuLabel className="p-">
          <div className="flex gap-3 items-center bg-primary/10 p-2 rounded">
            <UserAvatarImage imageUrl={user.image || null} />
            <div className="flex flex-col text-start max-w-32">
              <p className="font-semibold truncate">{user.name}</p>
              <p className="font-semibold truncate">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className=" flex gap-2">
            <Icons.profile className="w-5 h-5 fill-foreground" />
            <Link href="/profile" className="w-full font-semibold">
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOut className="w-full justify-start" variant="ghost" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserAvatarImage({ imageUrl, ...props }: UserAvatarImageProps) {
  return (
    <Avatar
      className={cn("flex justify-center items-center cursor-pointer  w-8 h-8")}
      {...props}
    >
      <AvatarImage
        src={imageUrl ? imageUrl : "/boy.png"}
        alt="avatar"
        className="rounded-full"
      />
    </Avatar>
  );
}
