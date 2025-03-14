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
import { cn, getInitials } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";
import Link from "next/link";
import SignOut from "../Auth/SignOut";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Icons } from "../icons";
import { User as nextAuthUser } from "next-auth";
import { User as prismaUser } from "@prisma/client";
import { AVATAR_COLORS } from "@/constants";
import { Button } from "../ui/button";

type UserAvatarProps = AvatarProps & {
  user: nextAuthUser | prismaUser;
};

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatarImage user={user} {...props} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-5 sm:ml-10">
        <DropdownMenuLabel>
          <div className="flex gap-3 items-center bg-primary/10 p-2 rounded">
            <UserAvatarImage user={user} />
            <div className="flex flex-col text-start max-w-32">
              <p className="font-semibold truncate">{user.name}</p>
              <p className="font-semibold truncate">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className=" flex gap-2">
            <Icons.settings className="w-5 h-5 fill-foreground" />
            <Link href={`/settings`} className="w-full font-semibold">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut
            className="w-full justify-start hover:text-white hover:bg-destructive group"
            iconClassName="group-hover:text-white"
            variant="ghost"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserAvatarImage({
  user,
  className,
  ...props
}: UserAvatarProps) {
  if (!user) return null;
  const imageUrl = "imageUrl" in user ? user.imageUrl : user.image;
  const avatarColor = user.avatarColor || AVATAR_COLORS[0];

  return (
    <>
      {imageUrl ? (
        <Avatar
          className={cn(
            "flex justify-center items-center cursor-pointer  w-10 h-10",
            className
          )}
          {...props}
        >
          <AvatarImage src={imageUrl} alt="avatar" className="rounded-full" />
        </Avatar>
      ) : (
        <Button
          className={cn(
            "w-10 h-10 flex justify-center items-center text-white text-sm rounded-full",
            className
          )}
          style={{ backgroundColor: avatarColor || "E74C3C" }}
          {...props}
        >
          {getInitials(user.name)}
        </Button>
      )}
    </>
  );
}
