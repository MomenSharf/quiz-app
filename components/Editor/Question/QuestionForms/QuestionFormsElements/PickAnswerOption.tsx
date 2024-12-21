import { useEditorContext } from "@/components/Editor/Context";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ItemsSchemaType } from "@/lib/validations/quizSchemas";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { GripVertical, Trash } from "lucide-react";

type OprionProps = {
  questionIndex: number;
  itemIndex: number;
};

export default function PickAnswerOption({
  questionIndex,
  itemIndex,
}: // deleteOption,
OprionProps) {
  const {
    form: {
      control,
      getFieldState,
      getValues,
      setValue,
      trigger,
      formState: { errors },
    },
  } = useEditorContext();

  const y = useMotionValue(0);
  const dragControls = useDragControls();

  const items = getValues(`questions.${questionIndex}.items`);
  const item = getValues(`questions.${questionIndex}.items.${itemIndex}`);

  const setCorrectOption = () => {
    if ("isCorrect" in item) {
      if (item.text === "") {
        trigger(`questions.${questionIndex}.items.${itemIndex}`);
      } else {
        setValue(
          `questions.${questionIndex}.items.${itemIndex}.isCorrect`,
          item.isCorrect ? false : true,
          { shouldValidate: true }
        );
        if (errors && Object.values(errors).length !== 0)
          trigger(`questions.${questionIndex}.items`);
      }
    }
  };

  const { error } = getFieldState(
    `questions.${questionIndex}.items.${itemIndex}.text`
  );

  if ("isCorrect" in item)
    return (
      <Reorder.Item
        value={item}
        id={item.id}
        style={{ y }}
        animate={{ border: "1px solid var(hsl(--primary))" }}
        dragControls={dragControls}
        className="flex rounded group relative"
      >
        <FormField
          control={control}
          name={`questions.${questionIndex}.items.${itemIndex}.text`}
          render={({ field }) => (
            <FormItem className="space-y-1 flex w-full flex-col bg-whte">
              <FormControl>
                <div className="bg-white rounded-tl-md rounded-bl-md">
                  <Input
                    className={cn(
                      "h-12 font-semibold rounded-tr-none rounded-br-none focus:z-10",
                      {
                        "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                          error,
                      }
                    )}
                    placeholder={`Option ${itemIndex + 1}...`}
                    {...field}
                    value={getValues(
                      `questions.${questionIndex}.items.${itemIndex}.text`
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={() => {
            setValue(
              `questions.${questionIndex}.items`,
              items.filter((e) => e.id !== item.id) as ItemsSchemaType
            );
          }}
          size="icon"
          variant="outline"
          className="h-12 group/delete rounded-none border-l-0 disabled:opacity-100 focus:z-10"
          disabled={items.length <= 2}
        >
          <Trash className="w-4 h-4 group-hover/delete:text-destructive group-disabled/delete:opacity-50" />
        </Button>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={setCorrectOption}
              size="icon"
              variant="outline"
              className="h-12 group/isCorrect rounded-none border-x-0 focus:z-10"
            >
              <Icons.check
                className={cn("w-5 h-5 fill-transparent", {
                  "fill-success": item.isCorrect,
                  "group-hover/isCorrect:border-success group-hover/isCorrect:border group-hover/isCorrect:rounded-full group-hover/isCorrect:w-4 group-hover/isCorrect:h-4":
                    !item.isCorrect,
                })}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">
            Mark as correct answer
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-12 group/move rounded-tl-none rounded-bl-none focus:z-10"
            >
              <GripVertical
                onPointerDown={(e) => dragControls.start(e)}
                className="w-4 h-4 rounded-tl-none rounded-bl-none border-l-0 group-hover/move:text-primary"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">Reorder</TooltipContent>
        </Tooltip>
      </Reorder.Item>
    );
}