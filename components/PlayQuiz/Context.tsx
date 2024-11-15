import { EditorQuiz } from "@/types";
import { Question } from "@prisma/client";
import { Members, PresenceChannel } from "pusher-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export type PlayQuizQuestion = EditorQuiz["questions"][number] & {
  timeTaken: number;
  isAnswerRight: boolean;
};

type PlayQuizState = {
  currentQuestion: number;
  playQuizQuestions: PlayQuizQuestion[];
};

type PlayQuizActions =
  | { type: "SET_QUESTIONS"; payload: PlayQuizQuestion[] }
  | { type: "SET_CURRENT_QUESTION"; payload: number };

type PlayQuizContextType = {
  state: PlayQuizState;
  dispatch: React.Dispatch<PlayQuizActions>;
};

const initialState: PlayQuizState = {
  currentQuestion: 0,
  playQuizQuestions: [],
};

const quizRoomReducer = (
  state: PlayQuizState,
  action: PlayQuizActions
): PlayQuizState => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, playQuizQuestions: action.payload };
      case 'SET_CURRENT_QUESTION' :
        return { ...state, currentQuestion: action.payload };
    default:
      return state;
  }
};

const QuizRoomContext = createContext<PlayQuizContextType | undefined>(
  undefined
);

export const PlayQuizProvider = ({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: EditorQuiz;
}) => {
  const [state, dispatch] = useReducer(quizRoomReducer, initialState);

  const initialQuestions: PlayQuizQuestion[] = useMemo(() => {
    return quiz.questions.map((question) => {
      return { ...question, timeTaken: 0, isAnswerRight: false };
    });
  }, [quiz.questions]);

  useEffect(() => {
    dispatch({ type: "SET_QUESTIONS", payload: initialQuestions });
  }, [initialQuestions]);

  return (
    <QuizRoomContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizRoomContext.Provider>
  );
};

// Custom hook for using the editor context
export const usePlayQuizContext = () => {
  const context = useContext(QuizRoomContext);
  if (context === undefined) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};
