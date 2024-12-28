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
import { useRouter } from "next/navigation";

export default function SaveState() {
  const {
    state: {saveState},
  } = useEditorContext();

  const router = useRouter();

  return (
    <div className="flex justify-center items-center mx-1">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant="ghost" className="p-1 cursor-default">
            {saveState === "waiting" ? (
              <Icons.Loader className="w-6 h-6 stroke-muted-foreground animate-spin" />
            ) : saveState === "offline" ? (
              <Icons.Offline className="w-6 h-6 fill-muted-foreground " />
            ) : saveState === "bad" ? (
              <Icons.alert className="w-6 h-6 fill-amber stroke-background" />
            ) : (
              <Icons.check className="w-6 h-6 fill-success" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={cn("text-xs relative", {
            "border-destructive": saveState === "bad",
          })}
        >
          {saveState === "waiting" ? (
            "Saving..."
          ) : saveState === "offline" ? (
            "You are offline"
          ) : saveState === "bad" ? (
            <>
              Something worng{" "}
              <button
                type="button"
                onClick={() => {
                  if (location) location.reload();
                }}
                className="p-0 font-bold underline"
              >
                Refresh
              </button>
            </>
          ) : (
            "all chenges saved"
          )}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
