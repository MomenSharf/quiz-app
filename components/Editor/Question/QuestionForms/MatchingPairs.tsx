import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useEditorContext } from "../../Context";
import ErrorSpan from "./QuestionFormsElements/ErrorSpan";

export default function MatchingPairs({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: {
      getValues,
      setValue,
      control,
      getFieldState,
      formState: { errors },
    },
  } = useEditorContext();
  const question = getValues(`questions.${questionIndex}`);

  useEffect(() => {
    if (question.type === "MATCHING_PAIRS") {
      if (
        !question.items ||
        question.items.length === 0 ||
        (question.items[0] && "isBlank" in question.items[0])
      ) {
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
          ],
        });
      }
    }
  }, [question, questionIndex, setValue]);

  if (question.type !== "MATCHING_PAIRS") return;

  const paires = question.items;

  const addPairs = () => {
    setValue(`questions.${questionIndex}.items`, [
      ...question.items,
      {
        id: crypto.randomUUID(),
        text: "",
        match: "",
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-3">
      {question.items &&
        question.items.map(({ id }, i) => {
          return (
            <div className="flex" key={id}>
              <div className="flex flex-col w-full z-[2]">
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.items.${i}.text`}
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex w-full flex-col tepri">
                      <FormControl>
                        <div className="bg-card rounded-tl-md rounded-bl-md">
                          <Input
                            className={cn(
                              "h-12 font-semibold rounded-tr-none rounded-bl-none rounded-br-none focus:z-10",
                              {
                                "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                                  getFieldState(
                                    `questions.${questionIndex}.items.${i}.text`
                                  ).error,
                              }
                            )}
                            placeholder={`Prompt ${i + 1}...`}
                            {...field}
                            value={getValues(
                              `questions.${questionIndex}.items.${i}.text`
                            )}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.items.${i}.match`}
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex w-full flex-col tepri">
                      <FormControl>
                        <div className="bg-card rounded-tl-md rounded-bl-md">
                          <Input
                            className={cn(
                              "h-12 font-semibold border-t-0 rounded-tr-none rounded-tl-none rounded-br-none focus:z-10",
                              {
                                "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                                  getFieldState(
                                    `questions.${questionIndex}.items.${i}.match`
                                  ).error,
                              }
                            )}
                            placeholder={`Answer ${i + 1}...`}
                            {...field}
                            value={getValues(
                              `questions.${questionIndex}.items.${i}.match`
                            )}
                          />
                        </div>
                      </FormControl>
                      <div className="flex">
                        <ErrorSpan
                          error={
                            getFieldState(
                              `questions.${questionIndex}.items.${i}.text`
                            ).error
                          }
                        />
                        {getFieldState(
                          `questions.${questionIndex}.items.${i}.text`
                        ).error &&
                          getFieldState(
                            `questions.${questionIndex}.items.${i}.match`
                          ).error && (
                            <span className="text-destructive text-xs mx-1">
                              {" "}
                              &{" "}
                            </span>
                          )}
                        <ErrorSpan
                          error={
                            getFieldState(
                              `questions.${questionIndex}.items.${i}.match`
                            ).error
                          }
                        />
                      </div>
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
                disabled={paires.length <= 2}
              >
                <Trash className="w-4 h-4 group-hover/delete:text-destructive group-disabled/delete:opacity-50" />
              </Button>
            </div>
          );
        })}
      {question.items && question.items.length < 5 && (
        <Button type="button" onClick={addPairs}>
          Add Pairs
        </Button>
      )}
    </div>
  );
}
