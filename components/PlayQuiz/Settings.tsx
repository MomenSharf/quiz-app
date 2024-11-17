"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings as S, VideoOff, Volume2, VolumeX } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function Settings() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <S className="w-4 h-4 text" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
          className="justify-between"
        >
          Sound Effect
          {showStatusBar ? (
            <Volume2 className="w-4 h-4 justify-self-end" />
          ) : (
            <VolumeX className="w-4 h-4 self-end" />
          )}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
