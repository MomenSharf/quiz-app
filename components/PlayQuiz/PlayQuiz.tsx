import Content from "./Content";
import { usePlayQuizContext } from "./Context";
import Footer from "./Footer";
import Header from "./Header";

export default function PlayQuiz() {
  const {
    state: { playQuizQuestions },
  } = usePlayQuizContext();
  console.log(playQuizQuestions);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content questions={playQuizQuestions} />
      {/* <Footer /> */}
      {/* {playQuizQuestions.map((question) => {
        return <OptionsSwitcher key={question.id} question={question} />;
      })} */}
    </div>
  );
}
