import { QuizDetails } from "@/types";
import React from "react";
import { Badge } from "../ui/badge";
import { toCapitalize } from "@/lib/utils";
import { formatISODuration, intervalToDuration } from "date-fns";
import { Medal, Timer } from "lucide-react";
import PickAnswer from "./QuestionOption/PickAnswer";
import TrueFalse from "./QuestionOption/TrueFalse";
import FillInTheBlanks from "./QuestionOption/FillInTheBlanks";
import Order from "./QuestionOption/Order";
import MatchingPairs from "./QuestionOption/MatchingPairs";

export default function Question({
  question,
  showAnswers,
}: {
  question: QuizDetails["questions"][number];
  showAnswers: boolean;
}) {
  const Options = () => {
    switch (question.type) {
      case "PICK_ANSWER":
        return <PickAnswer question={question} showAnswers={showAnswers} />;
      case "TRUE_FALSE":
        return <TrueFalse question={question} showAnswers={showAnswers} />;
      case "SHORT_ANSWER":
        return (
          <>
            {showAnswers && (
              <p className="truncate font-semibold">{question.correctAnswer}</p>
            )}
          </>
        );
      case "MATCHING_PAIRS":
        return <MatchingPairs question={question} showAnswers={showAnswers} />;
      case "ORDER":
        return <Order question={question} showAnswers={showAnswers} />;
      case "FILL_IN_THE_BLANK":
        return (
          <FillInTheBlanks question={question} showAnswers={showAnswers} />
        );
      default:
        null;
        break;
    }
  };
  function formatMilliseconds() {
    if (question.timeLimit < 1000) {
      return `${question.timeLimit}ms`;
    }

    const duration = intervalToDuration({ start: 0, end: question.timeLimit });

    if (duration.seconds && duration.seconds < 60) {
      return `${duration.seconds}sec`;
    }

    if (duration.minutes && duration.minutes < 60) {
      return `${duration.minutes}min`;
    }

    return formatISODuration(duration); // For longer durations
  }

  return (
    <div className="bg-card p-3 flex flex-col gap-2 rounded-md">
      <div className="flex justify-between">
        <Badge className="bg-primary/30 hover:bg-primary/30 text-primary gap-0.5">
          {toCapitalize(question.type.split("_").join(" ").toLowerCase())}
        </Badge>
        <div className="flex gap-1">
          <Badge className="bg-destructive/30 hover:bg-destructive/30 text-destructive gap-0.5">
            <Timer className="w-3 h-3 text-destructive" />
            {formatMilliseconds()}
          </Badge>
          <Badge className="bg-amber/30 hover:bg-amber/30 text-amber gap-0.5">
            <Medal className="w-3 h-3 text-amber" />
            {question.points} pts
          </Badge>
        </div>
      </div>
      {question.type !== "FILL_IN_THE_BLANK" && (
        <p className="text-lg font-semibold truncate">{question.question}</p>
      )}
      <Options />
    </div>
  );
}
