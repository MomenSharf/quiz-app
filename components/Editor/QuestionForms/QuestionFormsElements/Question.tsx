import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEditorContext } from "@/components/Editor/EditorContext";
import { Input, InputProps } from "@/components/ui/input";

type QuestionProps = InputProps & { questionIndex: number };

export default function Question({
  questionIndex,
  className,
  ...props
}: QuestionProps) {
  const {
    form: { control, getFieldState, getValues },
  } = useEditorContext();

  return (
    <FormField
      control={control}
      name={`questions.${questionIndex}.question`}
      render={({ field }) => (
        <FormItem className="space-y-1 flex w-full flex-col">
          <FormControl>
            <Input
              className={cn(
                "font-bold focus:z-10 text-lg",
                {
                  "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                    getFieldState(`questions.${questionIndex}.question`).error,
                },
                className
              )}
              placeholder="Question..."
              {...field}
              value={getValues(`questions.${questionIndex}.question`)}
              {...props}
            />
          </FormControl>
          <FormMessage className="text-xs font-extralight mt-0" />
        </FormItem>
      )}
    />
  );
}
