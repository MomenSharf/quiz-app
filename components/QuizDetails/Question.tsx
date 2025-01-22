import { QuizDetails } from "@/types";
import React from "react";
import { Badge } from "../ui/badge";
import { toCapitalize } from "@/lib/utils";
import { formatISODuration, intervalToDuration } from "date-fns";

export default function Question({
  question,
}: {
  question: QuizDetails["questions"][number];
}) {
  const Questionn = () => {
    switch (question.type) {
      case "PICK_ANSWER":
        return "PICK ANSWER";
      case "TRUE_FALSE":
        return "TRUE";
      case "SHORT_ANSWER":
        return "SHORT";
      case "MATCHING_PAIRS":
        return "MATCHING_PAIRS";
      case "ORDER":
        return "ORDER";
      case "FILL_IN_THE_BLANK":
        return "FILL_IN_THE_BL";
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
    <div className="bg-card p-3 flex flex-col rounded-md">
      <div className="flex justify-between">
        <Badge variant="outline">
          {toCapitalize(question.type.split("_").join(" ").toLowerCase())}
        </Badge>
        <div className="flex gap-1">
          <Badge variant="outline">{formatMilliseconds()}</Badge>
          <Badge variant="outline">{question.points} pts</Badge>
        </div>
      </div>
      <Questionn />
    </div>
  );
}
