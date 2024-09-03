import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { useEditorContext } from "../EditorContext";

export default function Question({ questionIndex }: { questionIndex: number }) {
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
              <Textarea
                className={cn(
                  "resize-y min-h-24 max-h-32 h-24 font-semibold text-2xl",

                  {
                    "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                      getFieldState(`questions.${questionIndex}`).error,
                  }
                )}
                placeholder="Question..."
                {...field}
                value={getValues(`questions.${questionIndex}.question`)}
              />
            </FormControl>
            <FormMessage className="text-xs font-extralight mt-0" />
          </FormItem>
        )}
      />
  );
}
