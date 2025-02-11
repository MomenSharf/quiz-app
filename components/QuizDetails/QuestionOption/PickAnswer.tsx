import { QuizDetails } from "@/types";
import { Check, Circle, X } from "lucide-react";
import { headers } from "next/headers";

export default function PickAnswer({
  question,
  showAnswers,
}: {
  question: QuizDetails["questions"][number];
  showAnswers: boolean;
}) {
  const headersList = headers();
  const referer = headersList.get("showAnswers"); // Example: Get Referer header
  if (question.type !== "PICK_ANSWER") return null;

  return (
    <div className="flex flex-col gap-">
      {question.items.map((item) => {
        return (
          <div key={item.id} className="flex gap-2 items-center">
            {!showAnswers ? (
              <Circle className="w-5 h-5 text-primary" />
            ) : item.isCorrect ? (
              <div className="bg-success rounded-full w-5 h-5 flex justify-center items-center">
                <Check className="w-3 h-3 text-card" />
              </div>
            ) : (
              <div className="bg-destructive rounded-full w-5 h-5 flex justify-center items-center">
                <X className="w-3 h-3 text-card" />
              </div>
            )}
            <p className="truncate font-semibold">
              {item.text} {referer}
            </p>
          </div>
        );
      })}
    </div>
  );
}
