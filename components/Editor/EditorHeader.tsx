"use client";
import { cn } from "@/lib/utils";
import { quizSchemaType } from "@/lib/validations/quizSchemas";
import { ArrowLeft, Redo, Redo2, Undo, Undo2, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { MutableRefObject, RefObject, useEffect, useState } from "react";
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

type EditorHeaderPros = {
  // quiz: Pick<Quiz, "title">;
  form: UseFormReturn<quizSchemaType>;
  saveState: "GOOD" | "BAD" | "WAITING" | "OFFLINE";
  historyIndex: MutableRefObject<number>;
  headerRef: RefObject<HTMLDivElement>;
  formsArray: quizSchemaType[];
  undoFunction: () => void;
  redoFunction: () => void;
};

export default function EditorHeader({
  form,
  saveState,
  historyIndex,
  formsArray,
  headerRef,
  undoFunction,
  redoFunction,
}: EditorHeaderPros) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const router = useRouter();

  const handleRevalidateAndBack = async () => {
    await revalidatePathInServer("dashbeard");
    router.back();
  };

  useEffect(() => {
    if (isEditingTitle) {
      form.setFocus("title");
    }
  }, [form, isEditingTitle]);

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
        {isEditingTitle ? (
          <FormField
            control={form.control}
            name={`title`}
            render={({ field }) => (
              <FormItem>
                <Input
                  className={cn(
                    "py-1 font-semibold",
                    {
                      "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                        form.getFieldState("title").error,
                    },
                    {
                      hidden: !isEditingTitle,
                    }
                  )}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    setIsEditingTitle(false);
                    if (!e.target.value) {
                      form.setValue("title", "My New Quiz");
                    }
                  }}
                />
              </FormItem>
            )}
          />
        ) : (
          <Button
            variant="outline"
            className="border-transparent hover:border-input font-semibold hover:bg-transparent cursor-text"
            onClick={() => setIsEditingTitle(true)}
          >
            <span className="truncate max-w-40">{form.getValues("title")}</span>
          </Button>
        )}
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
                <Icons.check className="w-6 h-6 fill-[#28A745]" />
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
                onClick={redoFunction}
                disabled={
                  historyIndex.current === formsArray.length - 1 ||
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
      </div>
    </div>
  );
}