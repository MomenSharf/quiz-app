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
import { COLORS, Theme_colors } from "@/constants";
import { Button } from "../ui/button";

export default function Palette() {
  const { state, dispatch } = useTheme();

  // to tailwind
  [
    "bg-[#7F8C8D]",
    "bg-[#6C7A89]",
    "bg-[#E74C3C]",
    "bg-[#FF66CC]",
    "bg-[#F39C12]",
    "bg-[#27AE60]",
    "bg-[#2980B9]",
    "bg-[#F1C40F]",
    "bg-[#7c3aed]",
  ];

  return (
    <div className=" relative flex justify-center items-center sm:py-3 min-w-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {/* <button> */}
          <PaletteIcom
            className={cn(
              "text-white hover:text-primary transition-all delay-100 absolute left-0 top-0 translate-x-1/2 translate-y-1/2  sm:-translate-y-1/2"
            )}
          />
          {/* </button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative left-5 top-8 sm:left-14 sm:bottom-1d6">
          <DropdownMenuLabel className="flex gap-2">
            <div className=" w-5 h-5 rounded-full bg-primary" />
            Theme Color
          </DropdownMenuLabel>
          <div className="grid grid-cols-3 p-3">
            {Theme_colors.map((color) => {
              return (
                <Button
                  key={color.id}
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      type: "SET_THEME",
                      payload: { mode: state.mode, theme: color.label },
                    })
                  }
                  className="flex gap-2 justify-start"
                >
                  <span
                    className={cn(
                      " w-5 h-5 rounded-full",
                      `bg-[${color.color}]`
                    )}
                  />
                  {color.label}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
