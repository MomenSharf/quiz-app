"use client";
import { cn } from "@/lib/utils";
import { quizSchemaType } from "@/lib/validations/quizSchemas";
import { ArrowLeft, Redo, Redo2, Undo, Undo2, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UseFormReturn } from "react-hook-form";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { revalidatePathInServer } from "@/lib/actions/quiz.actions";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Badge } from "../ui/badge";
import { useEditorContext } from "./EditorContext";

type EditorHeaderPros = {
  quizId: string;
};

export default function EditorHeader() {
  // const [isEditingTitle, setIsEditingTitle] = useState(false);
  const {
    dispatch,
    form: { setFocus, control, getValues, setValue, getFieldState },
    state: { saveState, historyArray, isEditingTitle },
    headerRef,
    historyIndex,
    undoFunction,
    redoFunction,
  } = useEditorContext();

  const router = useRouter();

  const handleRevalidateAndBack = async () => {
    await revalidatePathInServer("dashbeard");
    router.back();
  };

  useEffect(() => {
    if (isEditingTitle) {
      setFocus("title");
    }
  }, [setFocus, isEditingTitle]);

  return (
    <div
      className="bg-card flex gap-1 items-center py-1 px-0.5 border-b shadow-sm"
      ref={headerRef}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRevalidateAndBack}
        className="hidden md:flex"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div className="hidden md:flex">
        {/* {isEditingTitle ? ( */}
          <FormField
            control={control}
            name={`title`}
            render={({ field }) => (
              <FormItem>
                <Input
                  className={cn("h-9 font-semibold text-", {
                    hidden: !isEditingTitle,
                  })}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    dispatch({ type: "SET_IS_EDITING_TITLE", payload: false });
                    if (!e.target.value) {
                      setValue("title", "My New Quiz");
                    }
                  }}
                />
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            type="button"
            className={cn(
              "border-transparent hover:border-input font-semibold hover:bg-transparent cursor-text",
              {
                hidden: isEditingTitle,
              }
            )}
            onClick={() =>
              dispatch({ type: "SET_IS_EDITING_TITLE", payload: true })
            }
          >
            <span className="truncate max-w-40">{getValues("title")}</span>
          </Button>
      </div>
      <div className="flex justify-center items-center mx-1">
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-1 cursor-default">
              {saveState === "WAITING" ? (
                <Icons.Loader className="w-6 h-6 stroke-muted-foreground animate-spin" />
              ) : saveState === "OFFLINE" ? (
                <Icons.Offline className="w-6 h-6 fill-muted-foreground " />
              ) : saveState === "BAD" ? (
                <Icons.alert className="w-6 h-6 fill-[#FFC107] stroke-background" />
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
            ) : saveState === "OFFLINE" ? (
              "You are offline"
            ) : saveState === "BAD" ? (
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
      <div className="flex">
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <div className="inline-block">
              <Button
                type="button"
                onClick={undoFunction}
                disabled={historyIndex.current === 0 || saveState === "WAITING"}
                size="icon"
                variant="ghost"
                className="disabled:cursor-not-allowed"
              >
                <Undo2 className="w-4 h-4" />
              </Button>
            </div>
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
            <div className="inline-block">
              <Button
                type="button"
                onClick={redoFunction}
                disabled={
                  historyIndex.current === historyArray.length - 1 ||
                  saveState === "WAITING"
                }
                size="icon"
                variant="ghost"
              >
                <Redo2 className="w-4 h-4" />
              </Button>
            </div>
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
        <button type="submit">previwe</button>
      </div>
    </div>
  );
}
