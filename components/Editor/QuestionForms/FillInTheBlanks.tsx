import { Button } from "@/components/ui/button";
import { fillInTheBlankSchema } from "@/lib/validations/quizSchemas";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { FieldError } from "react-hook-form";
import { z } from "zod";
import { useEditorContext } from "../EditorContext";
import ErrorSpan from "./QuestionFormsElements/ErrorSpan";

export default function FillInTheBlanks({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: {
      getValues,
      setValue,
      watch,
      formState: { errors },
    },
  } = useEditorContext();
  const question = getValues(`questions.${questionIndex}`);

  console.log(question);

  const watchQuestion = watch(`questions.${questionIndex}.question`);
  const specialChars =
    /([ \t\r\f\?\!\/\@\$\>\<\*\+\-\(\)\[\]\{\}\:\;\'\"\`\|\&\^\%\,\.\s\\])/;
  function splitString(input: string) {
    const parts = input.split(specialChars);
    return parts.filter((part) => part === "\n" || part.trim() !== "");
  }

  useEffect(() => {
    if (question.type !== "FILL_IN_THE_BLANK") return;    
    if (question.question) {
      setValue(
        `questions.${questionIndex}.items`,
        question.question !== ''
          ? splitString(question.question).map((e, i) => {
              return {
                id: crypto.randomUUID(),
                text: e,
                isBlank:
                  question.items &&
                  question.items[i] &&
                  question.items[i].isBlank
                    ? true
                    : false,
              };
            })
          : []
      );
    }
  }, [questionIndex, watchQuestion]);

  const setIsBlank = (index: number) => {
    if (question.type !== "FILL_IN_THE_BLANK") return;
    setValue(
      `questions.${questionIndex}.items`,
      question.items.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            isBlank: e.isBlank ? false : true,
          };
        } else {
          return e;
        }
      })
    );
  };

  if (question.type !== "FILL_IN_THE_BLANK") return;

  const oneBlankError =
    errors.questions &&
    (errors.questions[questionIndex] as {
      items: {
        oneBlank: FieldError;
      };
    });

  console.log(oneBlankError);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end gap-3 flex-wrap mt-10">
        {question.items &&
          question.items.map((e, i) => {
            if (e.text === "\n") return <div key={e.id} className="w-full" />;
            if (specialChars.test(e.text)) return e.text + " ";
            if (i === 4) return <br key={e.id} />;
            return (
              <Button
                type="button"
                key={e.id}
                variant={e.isBlank ? "default" : "outline"}
                onClick={() => setIsBlank(i)}
                className="gap-1"
              >
                <span>{e.text}</span>
                {e.isBlank ? (
                  <EyeOff className="w-4 h-5" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            );
          })}
      </div>
      <ErrorSpan error={oneBlankError?.items.oneBlank} />
    </div>
  );
}
