import Content from "./Content";
import { usePlayQuizContext } from "./Context";
import Footer from "./Footer";
import Header from "./Header";
import StarterDialog from "./StarterDialog";

export default function PlayQuiz() {
  const {
    state: { playQuizQuestions },
  } = usePlayQuizContext();
  console.log(playQuizQuestions);

  return (
    <div className="flex flex-col min-h-screen">
      <Header  questions={playQuizQuestions}  />
      <Content questions={playQuizQuestions} />
      <Footer />
      <StarterDialog />
      {/* {playQuizQuestions.map((question) => {
        return <OptionsSwitcher key={question.id} question={question} />;
      })} */}
    </div>
  );
}
