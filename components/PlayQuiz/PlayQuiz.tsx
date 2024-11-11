import { EditorQuiz } from "@/types";
import { usePlayQuizContext } from "./PlayQuizContext";
import PlayQuizHeader from "./PlayQuizHeader";
import PlayQuizQuestion from "./PlayQuizQuestion";

export default function PlayQuiz() {

  const { state : {playQuizQuestions}} = usePlayQuizContext()
  console.log(playQuizQuestions);
  
  return <div className="flex flex-col">
    <PlayQuizHeader />
    <PlayQuizQuestion />
  </div>;
}
