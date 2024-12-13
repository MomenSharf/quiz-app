import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { POINTS_OPTIONS, TIMELIMIT_OPTIONS } from "@/constants";
import React from "react";
import { useEditorContext } from "../Context";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Bolt, EllipsisVertical, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SelectorMenu({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { setValue, getValues },
  } = useEditorContext();
  const {points, timeLimit} = getValues(`questions.${questionIndex}`);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size='icon'><EllipsisVertical className="w-4 h-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 relative left-5">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <Bolt className="w-4 h-4" />
            {points} Points
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="max-h-60 overflow-y-scroll">
              {POINTS_OPTIONS.map(({ label, value }, i) => (
                <DropdownMenuItem
                  key={i}
                  onSelect={() => {
                    setValue(`questions.${questionIndex}.points`, value);
                  }}
                  className={cn({
                    'text-primary bg-accent': value === points
                  })}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <Timer className="w-4 h-4" />
            {timeLimit / 1000} seconds
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="max-h-60 overflow-y-scroll">
              {TIMELIMIT_OPTIONS.map(({ label, value }, i) => (
                <DropdownMenuItem
                  key={i}
                  onSelect={() => {
                    setValue(`questions.${questionIndex}.timeLimit`, value);
                  }}
                  className={cn({
                    'text-primary bg-accent': value === timeLimit
                  })}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
