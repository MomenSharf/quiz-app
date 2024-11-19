import { PlayQuizQuestion } from "./Context";
import CorrectOrder from "./PlayQuizOptions/CorrectOrder";
import MatchingPairs from "./PlayQuizOptions/MatchingPairs";
import PickAnswer from "./PlayQuizOptions/PickAnswer";
import ShortAnswer from "./PlayQuizOptions/ShortAnswer";
import TrueAndFalse from "./PlayQuizOptions/TrueAndFalse";

export default function OptionsSwitcher({
  question,
}: {
  question: PlayQuizQuestion;
})  {
  switch (question.type) {
    case "PICK_ANSWER":
      return <PickAnswer question={question} />;
    case "TRUE_FALSE":
      return <TrueAndFalse question={question} />;
    case "SHORT_ANSWER":
      return <ShortAnswer question={question} />;
    // case "MATCHING_PAIRS":
    //   return <MatchingPairs question={question} />;
    // case "ORDER":
    //   return <CorrectOrder question={question} />;
    default:
      return;
  }
}
