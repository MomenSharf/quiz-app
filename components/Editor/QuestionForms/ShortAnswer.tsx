import { useEditorContext } from "@/components/Editor/EditorContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function ShortAnswer({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { control, getValues, getFieldState },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  if (question.type !== "SHORT_ANSWER") return;

  return (
    <FormField
      control={control}
      name={`questions.${questionIndex}.correctAnswer`}
      render={({ field }) => (
        <FormItem className="space-y-1 flex w-full flex-col">
          <FormControl>
            <Textarea
              className={cn("resize-none font-semibold focus:z-10 h-28 text-start", 
                {
                  "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                    getFieldState(`questions.${questionIndex}.correctAnswer`).error,
                },
              )}
              placeholder="Answer..."
              {...field}
              value={getValues(`questions.${questionIndex}.correctAnswer`)}
            />
          </FormControl>
          <FormMessage className="text-xs font-extralight mt-0" />
        </FormItem>
      )}
    />
  );
}
