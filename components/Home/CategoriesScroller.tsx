'use client'
import { CATEGORY_OPTIONS_LIST } from "@/constants";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScroller } from "@/hooks/useScroller";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoriesScroller() {
  const { isLeftVisible, isRightVisible, sliderRef, goLeft, goRight } =
    useScroller();

  return (
    <div className="flex flex-col">
      <h3>CATEGORIES</h3>
      <div className="relative w-full overflow-hidden">
        {isLeftVisible && (
          <div
            className="cursor-pointer group absolute z-[2] top-1/2 left-1 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full flex justify-center items-center"
            onClick={goLeft}
          >
            <ChevronLeft
              className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary"
              onClick={goLeft}
            />
          </div>
        )}
        <div
          ref={sliderRef}
          className="flex gap-3 p-1 transition-transform overflow-x-scroll no-scrollbar "
        >
          {CATEGORY_OPTIONS_LIST.map(({ id, label, value, icon: Icon }) => (
            <Link
              key={id}
              className={cn(buttonVariants({variant:'outline'}),"rounded-xl min-w-16 min-h-16  sm:min-w-20 sm:min-h-20 flex flex-col gap-1 hover:border-primary hover:scale-[1.05] transition-all duration-200")}
              href={`/discover`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
        {isRightVisible && (
          <div
            className="cursor-pointer group absolute z-[2] top-1/2 right-1 -translate-y-1/2 p-2 bg-card/70 hover:bg-card transition-all border rounded-full flex justify-center items-center"
            onClick={goRight}
          >
            <ChevronRight className="w-3 h-3 m:w-5 sm:h-5 group-hover:text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
