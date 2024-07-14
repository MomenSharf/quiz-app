"use client";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeMode() {
  const { state, dispatch } = useTheme();

  return (
    <div className=" relative flex justify-center items-center sm:py-3 min-w-10">
      <button onClick={() => dispatch({ type: "TOGGLED_MODE", payload: null })}>
        <SunIcon
          className={cn(
            "text-white hover:text-primary transition-all delay-100 absolute left-0 top-0 translate-x-1/2 translate-y-1/2  sm:-translate-y-1/2",
            {
              "scale-1": state.mode === "dark",
              "scale-0": state.mode === "light",
            }
          )}
        />
        <Moon
          className={cn(
            "text-white hover:text-primary transition-all delay-100 absolute left-0 top-0 translate-x-1/2 translate-y-1/2  sm:-translate-y-1/2",
            {
              "scale-0": state.mode === "dark",
              "scale-1": state.mode === "light",
            }
          )}
        />
      </button>
    </div>
  );
}
