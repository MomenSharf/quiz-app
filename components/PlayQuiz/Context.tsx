import { EditorQuiz } from "@/types";
import { QuestionType } from "@prisma/client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import stringSimilarity from "string-similarity";

export type PlayQuizQuestion = EditorQuiz["questions"][number] & {
  timeTaken: number;
  isAnswerRight: boolean | null;
};

type quizMode = "waiting" | "playing" | "answered" | "timeOut" | "ended";
export type Item = EditorQuiz["questions"][number]["items"][number];

type userAnswer =
  | { type: "PICK_ANSWER"; answer: Item }
  | { type: "CORRECT_ORDER"; answer: Item[] }
  | { type: "TRUE_FALSE"; answer: "true" | "false" }
  | { type: "SHORT_ANSWER"; answer: string }
  | null;
// | Item
// | Item[]
// | EditorQuiz["questions"][number]["correctAnswer"]
// | null;

type PlayQuizState = {
  currentQuestion: number;
  playQuizQuestions: PlayQuizQuestion[];
  isStarterDialogOpen: boolean;
  isResultSheetOpen: boolean;
  quizMode: quizMode;
  userAnswer: userAnswer;
  timeTaken: number;
};

type PlayQuizActions =
  | { type: "SET_QUESTIONS"; payload: PlayQuizQuestion[] }
  | { type: "SET_CURRENT_QUESTION"; payload: number }
  | { type: "SET_IS_STARTER_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_IS_RESULT_SHEET_OPEN"; payload: boolean }
  | { type: "SET_QUIZ_MODE"; payload: quizMode }
  | { type: "SET_USER_ANSWER"; payload: userAnswer }
  | { type: "SET_PLAY_QUIZ_QUESTIONS"; payload: PlayQuizQuestion[] }
  | { type: "SET_TIME_TAKEN"; payload: number };

type PlayQuizContextType = {
  state: PlayQuizState;
  dispatch: React.Dispatch<PlayQuizActions>;
};

const initialState: PlayQuizState = {
  currentQuestion: 0,
  playQuizQuestions: [],
  isStarterDialogOpen: false,
  isResultSheetOpen: false,
  quizMode: "waiting",
  userAnswer: null,
  timeTaken: 0,
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
    case "SET_IS_RESULT_SHEET_OPEN":
      return { ...state, isResultSheetOpen: action.payload };
    case "SET_QUIZ_MODE":
      return { ...state, quizMode: action.payload };
    case "SET_USER_ANSWER":
      return { ...state, userAnswer: action.payload };
    case "SET_PLAY_QUIZ_QUESTIONS":
      return { ...state, playQuizQuestions: action.payload };
    case "SET_TIME_TAKEN":
      return { ...state, timeTaken: action.payload };
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
  const {
    userAnswer,
    timeTaken,
    quizMode,
    playQuizQuestions,
    currentQuestion,
    isResultSheetOpen,
  } = state;

  const initialQuestions: PlayQuizQuestion[] = useMemo(() => {
    return quiz.questions.map((question) => {
      return { ...question, timeTaken: 0, isAnswerRight: null };
    });
  }, [quiz.questions]);

  useEffect(() => {
    dispatch({ type: "SET_QUESTIONS", payload: initialQuestions });
    dispatch({ type: "SET_IS_STARTER_DIALOG_OPEN", payload: true });
  }, [initialQuestions]);

  useEffect(() => {
    if (quizMode === "answered" && userAnswer) {
      let newPlayQuizQuestions: PlayQuizQuestion[];
      switch (userAnswer.type) {
        case "PICK_ANSWER":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (currentQuestion === i && userAnswer.answer.isCorrect) {
              return {
                ...question,
                isAnswerRight: userAnswer.answer.isCorrect,
                timeTaken,
              };
            } else {
              return question;
            }
          });
          dispatch({
            type: "SET_PLAY_QUIZ_QUESTIONS",
            payload: newPlayQuizQuestions,
          });
          setTimeout(() => {
            dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
          }, 500);
          break;
        case "SHORT_ANSWER":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (
              currentQuestion === i &&
              userAnswer.answer &&
              question.correctAnswer
            ) {
              const isAnswerRight = !!stringSimilarity.compareTwoStrings(
                userAnswer.answer.toLowerCase().trim(),
                question.correctAnswer.toLowerCase().trim()
              );
              return {
                ...question,
                isAnswerRight,
                timeTaken,
              };
            } else {
              return question;
            }
          });
          dispatch({
            type: "SET_PLAY_QUIZ_QUESTIONS",
            payload: newPlayQuizQuestions,
          });
          setTimeout(() => {
            dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
          }, 500);
          break;
        case "TRUE_FALSE":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (currentQuestion === i && userAnswer.answer) {
              return {
                ...question,
                isAnswerRight: userAnswer.answer === question.correctAnswer,
                timeTaken,
              };
            } else {
              return question;
            }
          });
          dispatch({
            type: "SET_PLAY_QUIZ_QUESTIONS",
            payload: newPlayQuizQuestions,
          });
          setTimeout(() => {
            dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
          }, 500);
          break;
        case "CORRECT_ORDER":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            const isAnswerRight =
              question.items.length === userAnswer.answer.length &&
              question.items
                .sort(
                  (a, b) => (a.order ? a.order : 0) - (b.order ? b.order : 0)
                )
                .every((item1, i) => {
                  return item1.order === userAnswer.answer[i].order;
                });
            if (currentQuestion === i && userAnswer.answer) {
              return {
                ...question,
                isAnswerRight,
                timeTaken,
              };
            } else {
              return question;
            }
          });
          dispatch({
            type: "SET_PLAY_QUIZ_QUESTIONS",
            payload: newPlayQuizQuestions,
          });
          setTimeout(() => {
            dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
          }, 1200);
          break;
      }
   
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizMode]);

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
    throw new Error(
      "usePlayQuizContext must be used within an PlayQuizProvider"
    );
  }
  return context;
};
