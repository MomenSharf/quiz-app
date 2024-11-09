import React, { useEffect } from "react";
import { toast } from "sonner";
import { useQuizRoomContext } from "./QuizRoomContext";

export default function QuizRoom({ quizRoomId }: { quizRoomId: string }) {

  const { dispatch } = useQuizRoomContext();


  return <div>QuizRoom</div>;
}
