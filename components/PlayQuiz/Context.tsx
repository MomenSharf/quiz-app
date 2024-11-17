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

type quizMode = "waiting" | "playing" | "timeOut" | "answered" | "ended";

type userAnswer =
  | EditorQuiz["questions"][number]["items"][number]
  | EditorQuiz["questions"][number]["correctAnswer"]
  | null;

type PlayQuizState = {
  currentQuestion: number;
  playQuizQuestions: PlayQuizQuestion[];
  isStarterDialogOpen: boolean;
  quizMode: quizMode;
  userAnswer: userAnswer;
};

type PlayQuizActions =
  | { type: "SET_QUESTIONS"; payload: PlayQuizQuestion[] }
  | { type: "SET_CURRENT_QUESTION"; payload: number }
  | { type: "SET_IS_STARTER_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_QUIZ_MODE"; payload: quizMode }
  | { type: "SET_USER_ANSWER"; payload: userAnswer };

type PlayQuizContextType = {
  state: PlayQuizState;
  dispatch: React.Dispatch<PlayQuizActions>;
};

const initialState: PlayQuizState = {
  currentQuestion: 0,
  playQuizQuestions: [],
  isStarterDialogOpen: false,
  quizMode: "waiting",
  userAnswer: null,
};

const quizRoomReducer = (
  state: PlayQuizState,
  action: PlayQuizActions
): PlayQuizState => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, playQuizQuestions: action.payload };
    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: action.payload };
    case "SET_IS_STARTER_DIALOG_OPEN":
      return { ...state, isStarterDialogOpen: action.payload };
    case "SET_QUIZ_MODE":
      return { ...state, quizMode: action.payload };
    case "SET_USER_ANSWER":
      return { ...state, userAnswer: action.payload };
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
    dispatch({ type: "SET_IS_STARTER_DIALOG_OPEN", payload: true });
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
