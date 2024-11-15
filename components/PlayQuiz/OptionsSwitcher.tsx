import { PlayQuizQuestion } from "./Context";
import PickAnswer from "./PlayQuizOptions/PickAnswer";



export default function OptionsSwitcher({
  question,
}: {
  question: PlayQuizQuestion;
}) {
    switch (question.type) {
      case "PICK_ANSWER":
        return <PickAnswer />;
      default:
        return;
    }
}
