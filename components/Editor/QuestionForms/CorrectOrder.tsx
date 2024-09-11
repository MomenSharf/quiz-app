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
import CorrectOrderItem from "./QuestionFormsElements/CorrectOrderItem";
import { Item } from "@radix-ui/react-dropdown-menu";

export default function CorrectOrder({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { getValues, setValue },
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
          onReorder={(items) => {
            setValue(
              `questions.${questionIndex}.items`,
              items.map((item, i) => {
                return {
                  ...item,
                  order: i + 1,
                };
              })
            );
          }}
          values={question.items}
          className="flex flex-col gap-3"
        >
          {question.items.map((item, i) => {
            return (
              <CorrectOrderItem
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
