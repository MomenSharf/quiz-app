import { useEditorContext } from "@/components/Editor/EditorContext";
import ImageEditor from "@/components/Editor/QuestionImageManager/ImageEditor";
import QuestionImageManagerTabs from "@/components/Editor/QuestionImageManager/QuestionImageManagerTabs";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn, generateId } from "@/lib/utils";
import { GripVertical, Paperclip } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import { UNSAVED_ID_PREFIX } from "@/constants";
import QuestionImage from "../QuestionImageManager/QuestionImage";
import Question from "./QuestionFormsElements/Question";
import PickAnswerOption from "./QuestionFormsElements/PickAnswerOption";

export default function PickAnswer({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { getValues, setValue },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  useEffect(() => {
    if (question.type === "PICK_ANSWER") {
      if (!question.items) {
        setValue(`questions.${questionIndex}`, {
          ...question,
          items: [
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
          ],
        });
      }
    }
  }, [question, questionIndex, setValue]);

  if (question.type !== "PICK_ANSWER") return;

  const { image } = question;

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
      <div className="flex flex-col gap-3">
        <Reorder.Group
          axis="y"
          onReorder={(items) => {
            setValue(`questions.${questionIndex}.items`, items);
          }}
          values={question.items}
          className="flex flex-col gap-3"
        >
          {question.items.map((item, i) => {
            return (
              <PickAnswerOption
                key={item.id}
                item={item}
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
