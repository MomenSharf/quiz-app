import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Redo2, Undo2 } from "lucide-react";
import { useEditorContext } from "../Context";
export default function UndoRedo() {
  const {
    state: { saveState, historyArray },
    undoFunction,
    redoFunction,
    historyIndex,
  } = useEditorContext();
  return (
    <div className="flex">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={undoFunction}
              disabled={historyIndex.current === 0 || saveState === "WAITING"}
              size="icon"
              variant="ghost"
              className="disabled:cursor-not-allowed w-8"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          undo{" "}
          <Badge variant="secondary" className="rounded-sm text-xs">
            Ctrl
          </Badge>{" "}
          <Badge variant="secondary" className="rounded-sm text-xs">
            Z
          </Badge>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={redoFunction}
              disabled={
                historyIndex.current === historyArray.length - 1 ||
                saveState === "WAITING"
              }
              size="icon"
              variant="ghost"
              className="w-8"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          undo{" "}
          <Badge variant="secondary" className="rounded-sm text-xs">
            Ctrl
          </Badge>{" "}
          <Badge variant="secondary" className="rounded-sm text-xs">
            Y
          </Badge>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
