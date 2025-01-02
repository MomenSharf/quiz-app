import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import ErrorSpan from "./QuestionFormsElements/ErrorSpan";
import { useEditorContext } from "../../Context";

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
  const { error } = getFieldState(`questions.${questionIndex}.correctAnswer`);

  return (
    <div className="flex flex-col gap-1">
      <FormField
        control={control}
        name={`questions.${questionIndex}.correctAnswer`}
        render={({ field }) => (
          <FormItem className="space-y-1 flex w-full flex-col">
            <FormControl>
              <div className="bg-card rounded-md">
                <Textarea
                  className={cn(
                    "resize-none font-semibold focus:z-10 h-28 text-start",
                    {
                      "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                        getFieldState(
                          `questions.${questionIndex}.correctAnswer`
                        ).error,
                    }
                  )}
                  placeholder="Answer..."
                  {...field}
                  value={getValues(`questions.${questionIndex}.correctAnswer`)}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      <ErrorSpan error={error} />
    </div>
  );
}
