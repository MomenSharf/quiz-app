import { useEditorContext } from "@/components/Editor2/EditorContext";
import { Button } from "@/components/ui/button";
import { Reorder } from "framer-motion";
import { useEffect } from "react";
import CorrectOrderItem from "./QuestionFormsElements/CorrectOrderItem";
import { FieldError } from "react-hook-form";
import ErrorSpan from "./QuestionFormsElements/ErrorSpan";

export default function CorrectOrder({
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
    if (question.type === "ORDER") {
      if (!question.items) {
        setValue(`questions.${questionIndex}.items`, [
          {
            id: crypto.randomUUID(),
            text: "",
            order: 1,
          },
          {
            id: crypto.randomUUID(),
            text: "",
            order: 2,
          },
          {
            id: crypto.randomUUID(),
            text: "",
            order: 3,
          },
        ]);
      }
    }
  }, [question, questionIndex, setValue]);

  if (question.type !== "ORDER") return;

  const addOption = () => {
    setValue(`questions.${questionIndex}.items`, [
      ...question.items,
      {
        id: crypto.randomUUID(),
        text: "",
        order: question.items.length,
      },
    ]);
  };

  return (
    question.items && (
      <div className="flex flex-col gap-3">
        <Reorder.Group
          axis="y"
          onReorder={async (items) => {
            setValue(
              `questions.${questionIndex}.items`,
              items.map((item, i) => {
                return {
                  ...item,
                  order: i + 1,
                };
              })
            );
            if (errors.questions) {
              await trigger();
            }
          }}
          values={question.items}
          className="flex flex-col gap-3"
        >
          {question.items.map((item, i) => {
            return (
              <CorrectOrderItem
                key={item.id}
                itemIndex={i}
                questionIndex={questionIndex}
              />
            );
          })}
        </Reorder.Group>

        {question.items.length < 8 && (
          <Button type="button" onClick={addOption}>
            Add Option
          </Button>
        )}
      </div>
    )
  );
}
