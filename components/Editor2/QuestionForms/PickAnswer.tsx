import { useEditorContext } from "@/components/Editor2/EditorContext";
import { Button } from "@/components/ui/button";
import { Reorder } from "framer-motion";
import { useEffect } from "react";
import PickAnswerOption from "./QuestionFormsElements/PickAnswerOption";
import ErrorSpan from "./QuestionFormsElements/ErrorSpan";
import { FieldError } from "react-hook-form";

export default function PickAnswer({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: {
      getValues,
      setValue,
      formState: { errors },
      trigger,
    },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  useEffect(() => {
    if (question.type === "PICK_ANSWER") {
      if (!question.items) {
        setValue(`questions.${questionIndex}.items`, [
          {
            id: crypto.randomUUID(),
            text: "",
            isCorrect: false,
          },
          {
            id: crypto.randomUUID(),
            text: "",
            isCorrect: false,
          },
          {
            id: crypto.randomUUID(),
            text: "",
            isCorrect: false,
          },
        ]);
      }
    }
  }, [question, questionIndex, setValue]);

  if (question.type !== "PICK_ANSWER") return;

  const oneCorrectAnswerError =
    errors.questions &&
    (errors.questions[questionIndex] as {
      items: {
        oneCorrectAnswer: FieldError;
      };
    });

  const addOption = () => {
    setValue(`questions.${questionIndex}.items`, [
      ...question.items,
      {
        id: crypto.randomUUID(),
        text: "",
        isCorrect: false,
      },
    ]);
  };

  return (
    question.items && (
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Options</p>
        <div className="flex flex-col gap-3">
          <Reorder.Group
            axis="y"
            onReorder={async (items) => {
              setValue(`questions.${questionIndex}.items`, items);
              if (errors.questions) {
                await trigger();
              }
            }}
            values={question.items}
            className="flex flex-col gap-3"
          >
            {question.items.map((item, i) => {
              return (
                <PickAnswerOption
                  key={item.id}
                  itemIndex={i}
                  questionIndex={questionIndex}
                />
              );
            })}
          </Reorder.Group>
          <ErrorSpan
            error={
              oneCorrectAnswerError?.items.oneCorrectAnswer &&
              oneCorrectAnswerError?.items.oneCorrectAnswer
            }
          />

          {question.items.length < 8 && (
            <Button type="button" onClick={addOption}>
              Add Option
            </Button>
          )}
        </div>
      </div>
    )
  );
}
