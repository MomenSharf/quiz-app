import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Items } from "@prisma/client";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { GripVertical, Trash } from "lucide-react";
import { ItemsSchemaType } from "@/lib/validations/quizSchemas";
import { useEditorContext } from "@/components/Editor/EditorContext";
import ErrorSpan from "./ErrorSpan";

type OprionProps = InputProps & {
  questionIndex: number;
  itemIndex: number;
};

export default function CorrectOrderItem({
  className,
  questionIndex,
  itemIndex,
}: OprionProps) {
  const {
    form: { control, getFieldState, getValues, setValue },
  } = useEditorContext();

  const y = useMotionValue(0);
  const dragControls = useDragControls();

  const items = getValues(`questions.${questionIndex}.items`);
  const item = getValues(`questions.${questionIndex}.items.${itemIndex}`);

  const { error } = getFieldState(
    `questions.${questionIndex}.items.${itemIndex}.text`
  );

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      animate={{ border: "1px solid var(hsl(--primary))" }}
      dragListener={false}
      dragControls={dragControls}
      className={cn("rounded group relative", {
        "mb-4": error,
      })}
    >
      <div className="flex">
        <FormField
          control={control}
          name={`questions.${questionIndex}.items.${itemIndex}.text`}
          render={({ field }) => (
            <FormItem className="space-y-1 flex w-full flex-col tepri">
              <FormControl>
                <Input
                  className={cn(
                    "h-12 font-semibold rounded-tr-none rounded-br-none focus:z-10",
                    {
                      "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                        error,
                    },
                    className
                  )}
                  placeholder={`item ${itemIndex + 1}...`}
                  {...field}
                  value={getValues(
                    `questions.${questionIndex}.items.${itemIndex}.text`
                  )}
                />
              </FormControl>
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
          className="h-12 border-r-0 group/delete rounded-none border-l-0 disabled:opacity-100 focus:z-10"
          disabled={items.length <= 2}
        >
          <Trash className="w-4 h-4 group-hover/delete:text-destructive group-disabled/delete:opacity-50" />
        </Button>

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
      </div>
      <div className="absolute -bottom-6 ">
        <ErrorSpan error={error} />
      </div>
    </Reorder.Item>
  );
}
