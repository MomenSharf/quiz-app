import { Github, Plus, Settings, UserCircle, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import Link from "next/link";
import SignOut from "./SignOut";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";

interface UserAvatarProps extends AvatarProps {
  isLoggedIn: boolean; // Check if user is logged in or not.
  user: Pick<User, "image" | "name">;
}

export function UserAvatar({ isLoggedIn, user, ...props }: UserAvatarProps) {
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar {...props} className="cursor-pointer  w-8 h-8">
          <AvatarImage
            src={user.image!}
            alt="avatar"
            // fill
            
            className="rounded-full"
          />
          <AvatarFallback className="bg-transparent">
            <div className="flex w-8 h-8">
            <UserCircle className="w- h-8 bg-transparent" />

            </div>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {isLoggedIn ? (
        <DropdownMenuContent className="w-56 mr-5 sm:ml-10">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <Link
                href="/profie"
                className='w-full'
              >
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link
                href="/settings"
                className='w-full'
              >
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>inveit firend</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOut className="w-full justify-start" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56 ml-10">
          <DropdownMenuLabel>
            Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <Link
                href="/sign-in"
                className='w-full'
              >
                Sing in
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>inveit firend</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
