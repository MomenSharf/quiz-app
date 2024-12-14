import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { X } from "lucide-react";
import { useEditorContext } from "../Context";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function SaveState() {
  const {
    state: { saveState },
  } = useEditorContext();
  return (
    <div className="flex justify-center items-center mx-1">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant="ghost" className="p-1 cursor-default">
            {saveState === "WAITING" ? (
              <Icons.Loader className="w-6 h-6 stroke-muted-foreground animate-spin" />
            ) : // ) : saveState === "OFFLINE" ? (
            //   <Icons.Offline className="w-6 h-6 fill-muted-foreground " />
            saveState === "BAD" ? (
              <Icons.alert className="w-6 h-6 fill-amber stroke-background" />
            ) : (
              <Icons.check className="w-6 h-6 fill-success" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={cn("text-xs relative", {
            "border-destructive": saveState === "BAD",
          })}
        >
          {saveState === "WAITING" ? (
            "Saving..."
          ) : // ) : saveState === "OFFLINE" ? (
          //   "You are offline"
          saveState === "BAD" ? (
            <div className="pt-2">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-0 right-0 p-1 w-auto h-auto self-end"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
              Something worng{" "}
              <button
                onClick={() => {
                  if (location) location.reload();
                }}
                className="p-0 font-bold underline"
              >
                Refresh
              </button>
            </div>
          ) : (
            "all chenges saved"
          )}
          <TooltipArrow
            className={cn("fill-popover", {
              "fill-destructive": saveState === "BAD",
            })}
          />
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
