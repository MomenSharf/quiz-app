import {
  Github,
  Plus,
  Settings,
  User as UserIcon
} from "lucide-react";

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
import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import Link from "next/link";
import SignOut from "../Auth/SignOut";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Icons } from "../icons";

type UserAvatarProps = {
  isLoggedIn: boolean; // Check if user is logged in or not.
  user: Pick<User, "image" | "name" | "email">;
};
type UserAvatarImageProps = AvatarProps & {
  imageUrl: string | null;
};

export function UserAvatar({ isLoggedIn, user }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatarImage imageUrl={user.image} />
      </DropdownMenuTrigger>
      {isLoggedIn ? (
        <DropdownMenuContent className="w-56 mr-5 sm:ml-10">
          <DropdownMenuLabel>
            <div className="flex gap-3 items-center bg-[hsl(var(--primary)_/_15%)] p-2 rounded">
              <UserAvatarImage imageUrl={user.image} />
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
              <Link href="/profie" className="w-full font-semibold">
                Profile
              </Link>
            </DropdownMenuItem>

            {/* <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/settings" className="w-full font-semibold">
                Settings
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span className="w-full font-semibold"> inveit firend</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span className="w-full font-semibold">GitHub</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOut className="w-full justify-start" variant="ghost" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56 ml-10">
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <Link href="/sign-in" className="w-full">
                Sing in
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span className="w-full font-semibold">inveit firend</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span className="w-full font-semibold">GitHub</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export function UserAvatarImage({
  imageUrl,
  className,
  ...props
}: UserAvatarImageProps) {
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
