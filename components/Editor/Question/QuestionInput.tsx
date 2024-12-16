import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEditorContext } from "../Context";
import QuestionImageManagerTabs from "./QuestionImageManager/QuestionImageManagerTabs";

export default function QuestionInput({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { control, getValues, getFieldState },
  } = useEditorContext();

  return (
    <FormField
      control={control}
      name={`questions.${questionIndex}.question`}
      render={({ field }) => (
        <FormItem className="space-y-1 flex w-full flex-col relative">
          <FormLabel className="text-inherit">Question</FormLabel>
          <FormControl className="bg-white rounded-md">
            <div className="flex">
              <Textarea
                className={cn(
                  "resize-none font-bold focus:z-10 text-lg min-h-14 rounded-tr-none rounded-br-none h-14",
                  {
                    "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive ":
                      getFieldState(`questions.${questionIndex}.question`)
                        .error,
                  }
                )}
                placeholder="Type your Question..."
                {...field}
                value={getValues(`questions.${questionIndex}.question`)}
              />
              <QuestionImageManagerTabs questionIndex={questionIndex} />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
