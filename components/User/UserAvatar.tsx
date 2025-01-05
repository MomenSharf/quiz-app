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

type UserAvatarImageProps = AvatarProps & {
  user: nextAuthUser | prismaUser;
};

export function UserAvatar({ user }: { user: nextAuthUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatarImage user={user} />
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
            <Icons.profile className="w-5 h-5 fill-foreground" />
            <Link href="/profile" className="w-full font-semibold">
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut className="w-full justify-start" variant="ghost" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserAvatarImage({
  user,
  className,
  ...props
}: UserAvatarImageProps) {
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
          <AvatarImage
            src={imageUrl ? imageUrl : "/boy.png"}
            alt="avatar"
            className="rounded-full"
          />
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
