import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useEditorContext } from "../EditorContext";
import { cn } from "@/lib/utils";

export default function TrueFalse({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { getValues, setValue },
  } = useEditorContext();
  const question = getValues(`questions.${questionIndex}`);

  useEffect(() => {
    if (question.type !== "TRUE_FALSE") return;
    
    if (question.correctAnswer !== 'true' && question.correctAnswer !== 'false')
      setValue(`questions.${questionIndex}.correctAnswer`, "true");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (question.type !== "TRUE_FALSE") return;

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-28 text-lg font-semibold transition-opacity text-primary-foreground bg-success/70 border-success opacity-60 hover:bg-success/70 hover:text-primary-foreground hover:opacity-100",
          {
            "opacity-100": question.correctAnswer === "true",
          }
        )}
        onClick={() =>
          setValue(`questions.${questionIndex}.correctAnswer`, "true")
        }
      >
        True
      </Button>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-28 text-lg font-semibold transition-opacity text-primary-foreground bg-destructive/70 border-destructive opacity-60 hover:bg-destructive/70 hover:text-primary-foreground hover:opacity-100",
          {
            "opacity-100": question.correctAnswer === "false",
          }
        )}
        onClick={() =>
          setValue(`questions.${questionIndex}.correctAnswer`, "false")
        }
      >
        False
      </Button>
    </div>
  );
}
