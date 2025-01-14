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
import {
  Settings as S,
  SoupIcon,
  VideoOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePlayQuizContext } from "./Context";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function Settings() {
  const {
    dispatch,
    state: { isSoundOn },
  } = usePlayQuizContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <S className="w-4 h-4 text" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={isSoundOn}
          onCheckedChange={(checked) =>
            dispatch({ type: "SET_IS_SOUND_ON", payload: checked })
          }
          className="justify-between"
        >
          Sound Effect
          {isSoundOn ? (
            <Volume2 className="w-4 h-4 justify-self-end" />
          ) : (
            <VolumeX className="w-4 h-4 self-end" />
          )}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
