import Content from "./Content";
import { usePlayQuizContext } from "./Context";
import Header from "./Header";
import ResultSheet from "./ResultSheet";
import StarterDialog from "./StarterDialog";

export default function PlayQuiz() {
  const {
    state: { playQuizQuestions },
  } = usePlayQuizContext();

  return (
    <div className="flex flex-col min-h-screen" >
      <Header questions={playQuizQuestions} />
      <Content questions={playQuizQuestions} />
      <StarterDialog />
      <ResultSheet />
    </div>
  );
}
