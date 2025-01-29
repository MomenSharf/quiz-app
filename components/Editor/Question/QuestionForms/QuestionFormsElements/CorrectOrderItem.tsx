import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ItemsSchemaType } from "@/lib/validations/quizSchemas";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { GripVertical, Trash } from "lucide-react";
import ErrorSpan from "./ErrorSpan";
import { useEditorContext } from "@/components/Editor/Context";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { ReorderIcon } from "./Icon";

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
  const iRef = useRef<HTMLElement | null>(null);

  const { error } = getFieldState(
    `questions.${questionIndex}.items.${itemIndex}.text`
  );

  useEffect(() => {
    const touchHandler: React.TouchEventHandler<HTMLElement> = (e) =>
      e.preventDefault();

    const iTag = iRef.current;

    if (iTag) {
      //@ts-ignore
      iTag.addEventListener("touchstart", touchHandler, { passive: false });

      return () => {
        //@ts-ignore
        iTag.removeEventListener("touchstart", touchHandler, {
          passive: false,
        });
      };
    }
  }, [iRef]);

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      animate={{ border: "1px solid var(hsl(--primary))" }}
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
                <div className="bg-card rounded-tl-md rounded-bl-md z-[2]">
                  <Input
                    className={cn(
                      "h-12 font-semibold rounded-tr-none rounded-br-none focus:z-10",
                      {
                        "border-destructive bg-destructive/10 focus-visible:ring-destructive":
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
                </div>
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
              className="h-12 group/move rounded-tl-none rounded-bl-none focus:z-10 justify-center items-center"
            >
              <ReorderIcon
                dragControls={dragControls}
                ref={iRef}
                className="fill-accent-foreground w-3 h-4"
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
