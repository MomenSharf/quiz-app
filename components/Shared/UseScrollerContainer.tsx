"use client";
import { CATEGORY_OPTIONS_LIST } from "@/constants";
import React, { ReactNode } from "react";
import { Button, buttonVariants } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScroller } from "@/hooks/useScroller";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UseScrollerContainer({
  children,
  scrollBy,
  className,
}: {
  children: ReactNode;
  scrollBy?: number;
  className?: string;
}) {
  const { isLeftVisible, isRightVisible, sliderRef, goLeft, goRight } =
    useScroller(scrollBy);

  return (
    <div className="flex">
      <div className="relative w-full overflow-hidden">
        {isLeftVisible && (
          <div
            className="w-8 h-8 cursor-pointer group absolute z-10 top-1/2 left-1 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full flex justify-center items-center"
            onClick={goLeft}
          >
            <ChevronLeft
              className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary"
              onClick={goLeft}
            />
          </div>
        )}
        <div ref={sliderRef} className={cn("no-scrollbar", className)}>
          {children}
        </div>
        {isRightVisible && (
          <div
            className="w-8 h-8 cursor-pointer group absolute z-10 top-1/2 right-1 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full flex justify-center items-center"
            onClick={goRight}
          >
            <ChevronRight className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
