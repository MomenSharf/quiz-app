import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Paperclip } from "lucide-react";
import { useEditorContext } from "../EditorContext";
import QuestionImage from "../QuestionImageManager/QuestionImage";
import QuestionImageManagerTabs from "../QuestionImageManager/QuestionImageManagerTabs";
import Question from "./QuestionFormsElements/Question";
import TrueFalse from "./TrueFalse";
import ShortAnswer from "./ShortAnswer";
import { useCallback, useMemo } from "react";
import MatchingPairs from "./MatchingPairs";
import PickAnswer from "./CorrectOrder";
import CorrectOrder from "./CorrectOrder";

type FormContainerType = {
  questionIndex: number;
};

export default function FormContainer({ questionIndex }: FormContainerType) {
  const {
    form: { getValues },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  const QuestionForm = useCallback(() => {
    switch (question.type) {
      case "PICK_ANSWER":
        return <PickAnswer questionIndex={questionIndex} />;
      case "TRUE_FALSE":
        return <TrueFalse questionIndex={questionIndex} />;
      case "SHORT_ANSWER":
        return <ShortAnswer questionIndex={questionIndex} />;
      case "MATCHING_PAIRS":
        return <MatchingPairs questionIndex={questionIndex} />;
      case "ORDER":
        return <CorrectOrder questionIndex={questionIndex} />;
      default:
        "no type";
        break;
    }
  }, [question.type, questionIndex]);

  if (question.type === "UNSELECTED") return;

  return (
    <div
      className={cn("grid sm:grid-cols-2 gap-3 w-full max-w-3xl", {
        "sm:grid-cols-3 max-w-4xl": question.image?.url,
      })}
    >
      {question.image?.url && (
        <div className="flex flex-col gap-3 w-full items-center">
          <QuestionImage imageUrl={question.image?.url} />
        </div>
      )}
      <div className="sm:col-span-2 flex flex-col gap-3">
        <div className="flex">
          <Question
            questionIndex={questionIndex}
            className="rounded-tr-none rounded-br-none h-14"
          />
          <QuestionImageManagerTabs
            trigger={
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="rounded-tl-none rounded-bl-none border-l-0 h-full"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            }
          />
        </div>
        <QuestionForm />
      </div>
    </div>
  );
}
