"use client";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Palette as PaletteIcom } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { THEME_COLORS } from "@/constants";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Palette() {
  const { state, dispatch } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className=" relative flex justify-center items-center min-w-10">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="rounded-full overflow-hidden border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Image
            src="/assets/images/gradient-themes.gif"
            alt="change theme"
            width={25}
            height={25}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative -left-5 top-8 sm:-left-10 sm:bottom-1d6">
          <DropdownMenuLabel className="flex gap-2">
            <div className=" w-5 h-5 rounded-full bg-primary" />
            Theme Color
          </DropdownMenuLabel>
          <div className="grid grid-cols-3 p-3">
            {THEME_COLORS.map(({ id, label, color }) => {
              return (
                <Button
                  key={id}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    dispatch({
                      type: "SET_THEME",
                      payload: { mode: state.mode, theme: label },
                    });
                    setOpen(false);
                  }}
                  className="flex gap-2 justify-start"
                >
                  <span
                    className=" w-5 h-5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
