import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  CopyPlus,
  Ellipsis,
  PenLine,
  RotateCw,
  Trash,
} from "lucide-react";
import React from "react";
import { useEditorContext } from "../Context";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import { UNSAVED_ID_PREFIX } from "@/constants";
type SidebarItemMenuBrops = {
  question: questionSchemaType;
};

export default function SidebarItemMenu({ question }: SidebarItemMenuBrops) {
  const {
    dispatch,
    form: { getValues, resetField, setValue },
  } = useEditorContext();

  const questions = getValues("questions");
  const index = questions.find((q) => q.id === question.id)?.questionOrder;

  const reset = () => {
    if(index)
      resetField(`questions.${index}`);
  };

  const duplicate = () => {
    const id = `${UNSAVED_ID_PREFIX}${crypto.randomUUID()}`;
    setValue("questions", [
      ...questions,
      {
        ...question,
        questionOrder: questions.length,
        id,
      },
    ]);
    dispatch({
      type: "SET_CURRENT_QUESTION_ID",
      payload: id,
    });
  };

  const Rearrange = (newIndex: number) => {
    if(!index) return
    const updatedQuestions = [...questions];
    const [movedItem] = updatedQuestions.splice(index, 1);
    updatedQuestions.splice(newIndex, 0, movedItem).map((question, i) => {
      return {
        ...question,
        questionOrder: i,
      };
    });
    setValue("questions", updatedQuestions);
  };

  const deleteQuestion = () => {
    setValue(
      "questions",
      questions.filter((q) => q.id !== question.id)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group w-3 h-2 sm:w-4 sm:h-3 rounded-full hover:bg-primary focus-visible:ring-1"
          size="icon"
          variant="ghost"
        >
          <Ellipsis className="w-2 h-2 sm:w-3 sm:h-3 text-muted-foreground group-hover:text-primary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative w-36  text-muted-foreground text-sm sm:left-20">
        <DropdownMenuGroup
          className={cn({
            "hidden h-0": question.type === "UNSELECTED",
          })}
        >
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onSelect={reset}
          >
            <RotateCw className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-semibold text-xs sm:text-sm">Reset</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onSelect={duplicate}
          >
            <CopyPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-semibold text-xs sm:text-sm">Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 cursor-pointer">
            <PenLine className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-semibold text-xs sm:text-sm">
              {" "}
              Copy to...
            </span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex gap-2 cursor-pointer">
              <ArrowLeftRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-semibold text-xs sm:text-sm">
                Rearrange...
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {questions.map((question) => {
                  return (
                    <DropdownMenuItem
                      key={question.id}
                      onSelect={() => Rearrange(question.questionOrder)}
                    >
                      {question.questionOrder + 1}
                      {question.questionOrder === index && (
                        <span className="text-xs mx-1">
                          {"( Current postion )"}
                        </span>
                      )}
                    </DropdownMenuItem>
                  );
                })}
                {/* <DropdownMenuItem>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>More...</span>
                </DropdownMenuItem> */}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="justify-start text-xs sm:text-sm items-center gap-1 w-full text-destructive hover:!bg-destructive hover:!text-destructive-foreground cursor-pointer"
            onClick={deleteQuestion}
            disabled={questions.length <= 1}
          >
            <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
