import { useEditorContext } from "@/components/Editor/EditorContext";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useEffect } from "react";

export default function MatchingPairs({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { getValues, setValue, control },
  } = useEditorContext();
  const question = getValues(`questions.${questionIndex}`);
  console.log("good");

  useEffect(() => {
    if (question.type === "MATCHING_PAIRS") {
      if (!question.items) {
        setValue(`questions.${questionIndex}`, {
          ...question,
          items: [
            {
              id: crypto.randomUUID(),
              text: "",
              match: "",
            },
            {
              id: crypto.randomUUID(),
              text: "",
              match: "",
            },
            {
              id: crypto.randomUUID(),
              text: "",
              match: "",
            },
            {
              id: crypto.randomUUID(),
              text: "",
              match: "",
            },
            {
              id: crypto.randomUUID(),
              text: "",
              match: "",
            },
          ],
        });
      }
    }
  }, [question, questionIndex, setValue]);

  if (question.type !== "MATCHING_PAIRS") return;

  const paires = question.items;

  const addPairs = () => {
    setValue(
      `questions.${questionIndex}.items`,
      [
        ...question.items,
        {
          id: crypto.randomUUID(),
          text: "",
          match: "",
        },
      ]
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {question.items &&
        question.items.map(({ id }, i) => {
          return (
            <div className="flex" key={id}>
              <div className="flex flex-col w-full">
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.items.${i}.text`}
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex w-full flex-col tepri">
                      <FormControl>
                        <Input
                          className={cn(
                            "h-12 font-semibold rounded-tr-none rounded-bl-none rounded-br-none focus:z-10"
                            // {
                            //   "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                            //     getFieldState(
                            //       `questions.${questionIndex}.items.${itemIndex}`
                            //     ).error,
                            // },
                            // className
                          )}
                          placeholder={`Option ${i + 1}...`}
                          {...field}
                          value={getValues(
                            `questions.${questionIndex}.items.${i}.text`
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-extralight mt-0" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.items.${i}.match`}
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex w-full flex-col tepri">
                      <FormControl>
                        <Input
                          className={cn(
                            "h-12 font-semibold border-t-0 rounded-tr-none rounded-tl-none rounded-br-none focus:z-10"
                            // {
                            //   "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                            //     getFieldState(
                            //       `questions.${questionIndex}.items.${itemIndex}`
                            //     ).error,
                            // },
                            // className
                          )}
                          placeholder={`Option ${i + 1}...`}
                          {...field}
                          value={getValues(
                            `questions.${questionIndex}.items.${i}.match`
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-extralight mt-0" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                onClick={() => {
                  setValue(
                    `questions.${questionIndex}.items`,
                    paires.filter((e) => e.id !== id)
                  );
                }}
                size="icon"
                variant="outline"
                className="h-24 group/delete rounded-tl-none rounded-bl-none border-l-0 disabled:opacity-100 focus:z-10"
                disabled={paires.length <= 1}
              >
                <Trash className="w-4 h-4 group-hover/delete:text-destructive group-disabled/delete:opacity-50" />
              </Button>
            </div>
          );
        })}
      {question.items.length < 5 && (
        <Button type="button" onClick={addPairs}>
          Add Option
        </Button>
      )}
    </div>
  );
}
