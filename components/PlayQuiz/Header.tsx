import { toCapitalize } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { PlayQuizQuestion, usePlayQuizContext } from "./Context";
import Settings from "./Settings";
import ProgressBar from "./ProgressBar";

export default function Header({
  questions,
}: {
  questions: PlayQuizQuestion[];
}) {
  const {
    dispatch,
    state: { currentQuestion },
  } = usePlayQuizContext();
  return (
    <div className="flex items-center justify-between gap-3 p-1 bg-popover">
      <Button size="icon" variant="ghost">
        <ArrowLeft className="w-4 h-4" />
      </Button>
      {/* <div
        onClick={() => {
          dispatch({ type: "SET_CURRENT_QUESTION", payload: 0 });
        }}
        className="text-gray-800"
      >
        Question {currentQuestion + 1}/{questions.length} - {" "}
        {questions[currentQuestion] &&
          toCapitalize(
            questions[currentQuestion].type.split("_").join(" ").toLowerCase()
          )}
      </div> */}
      <ProgressBar  />
      <Button variant='ghost' size='icon' className="p-1 rounded-full">
         <Settings />
      </Button>
    </div>
  );
}
