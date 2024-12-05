import {
  ArrowLeftRight,
  Copy,
  CopyPlus,
  ExternalLink,
  PenLine,
  Play,
  RotateCcw,
  RotateCw,
  Trash,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Quiz } from "@prisma/client";
import { Butterfly_Kids } from "next/font/google";
import { Button, buttonVariants } from "../ui/button";
import { useEditorContext } from "./EditorContext";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import { UNSAVED_ID_PREFIX } from "@/constants";
import { MouseEvent } from "react";

type EditorSidebarItemMenuProps = {
  trigger: JSX.Element;
  question: questionSchemaType;
  contentPostionClasses?: string;
};

export default function EditorSidebarItemMenu({
  trigger,
  contentPostionClasses,
  question,
}: EditorSidebarItemMenuProps) {
  const {
    dispatch,
    state: { currentQuestion },
    form: { setValue, getValues },
  } = useEditorContext();

  const questions = getValues("questions");

  const duplicateQuestion = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const id = `${UNSAVED_ID_PREFIX}${crypto.randomUUID()}`;
    e.stopPropagation();
    setValue("questions", [
      ...questions,
      {
        ...question,
        questionOrder: questions.length,
        id,
      },
    ]);
    dispatch({
      type: "SET_CURRENT_QUESTION",
      payload: id,
    });
  };

  const deleteQuestion = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    setValue(
      "questions",
      questions
        .filter((e) => e.id !== question.id)
        .map((e, i) => ({
          ...e,
          questionOrder: i,
        }))
    );

    if (question.id === questions[0].id) {
      dispatch({ type: "SET_CURRENT_QUESTION", payload: questions[1].id });
    } else {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: questions[questions.indexOf(question) - 1].id,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          contentPostionClasses,
          "relative w-40 text-muted-foreground text-sm"
        )}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <RotateCw className="w-4 h-4" />
            <span className="font-semibold">Reset</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={duplicateQuestion}
          >
            <CopyPlus className="w-4 h-4" />
            <span className="font-semibold">Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <PenLine className="w-4 h-4" />
            <span className="font-semibold">Copy to...</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <ArrowLeftRight className="w-4 h-4" />
            <span className="font-semibold">Rearrange...</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={cn(
              "justify-start items-center gap-1 w-full text-destructive hover:!bg-destructive hover:!text-destructive-foreground cursor-pointer"
            )}
            onClick={deleteQuestion}
            disabled={questions.length <= 1}
          >
            <Trash className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
