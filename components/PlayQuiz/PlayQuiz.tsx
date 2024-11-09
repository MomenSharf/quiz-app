import { EditorQuiz } from "@/types";
import { usePlayQuizContext } from "./PlayQuizContext";

export default function PlayQuiz() {

  const { state : {playQuizQuestions}} = usePlayQuizContext()
  console.log(playQuizQuestions);
  
  return <div className=""></div>;
}
