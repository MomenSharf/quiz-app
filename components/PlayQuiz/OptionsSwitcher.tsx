import { PlayQuizQuestion } from "./Context";
import PickAnswer from "./PlayQuizOptions/PickAnswer";
import TrueAndFalse from "./PlayQuizOptions/TrueAndFalse";



export default function OptionsSwitcher({
  question,
}: {
  question: PlayQuizQuestion;
}) {
    switch (question.type) {
      case "PICK_ANSWER":
        return <PickAnswer question={question}  />;
      case 'TRUE_FALSE' :
        return <TrueAndFalse  question={question}/>
      default:
        return;
    }
}
