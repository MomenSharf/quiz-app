import { saveQuizProgress } from "@/lib/actions/quiz.actions";
import { EditorQuiz, PlayQuizType } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import stringSimilarity from "string-similarity";

export type PlayQuizQuestion = EditorQuiz["questions"][number] & {
  // timeTaken: number;
  isAnswerRight: boolean | null;
};

type quizMode = "waiting" | "playing" | "answered" | "timeOut" | "ended";
export type Item = EditorQuiz["questions"][number]["items"][number];
export type fillInTheBlankChoice = { item: Item; index: number };

type userAnswer =
  | { type: "PICK_ANSWER"; answer: Item }
  | { type: "CORRECT_ORDER"; answer: Item[] }
  | { type: "MATCHING_PAIRS"; answer: { texts: Item[]; matches: Item[] } }
  | { type: "TRUE_FALSE"; answer: "true" | "false" }
  | { type: "SHORT_ANSWER"; answer: string }
  | { type: "FILL_IN_THE_BLANKS"; answer: fillInTheBlankChoice[] }
  | null;

type PlayQuizState = {
  currentQuestion: number;
  playQuizQuestions: PlayQuizQuestion[];
  isStarterDialogOpen: { open: boolean; isStarted?: boolean };
  isResultSheetOpen: boolean;
  quizMode: quizMode;
  userAnswer: userAnswer;
  timeTakenArray: { questionId: string; timeTaken: number }[] | null;
};

type PlayQuizActions =
  | { type: "SET_QUESTIONS"; payload: PlayQuizQuestion[] }
  | { type: "SET_CURRENT_QUESTION"; payload: number }
  | {
      type: "SET_IS_STARTER_DIALOG_OPEN";
      payload: { open: boolean; isStarted?: boolean };
    }
  | { type: "SET_IS_RESULT_SHEET_OPEN"; payload: boolean }
  | { type: "SET_QUIZ_MODE"; payload: quizMode }
  | { type: "SET_USER_ANSWER"; payload: userAnswer }
  | { type: "SET_PLAY_QUIZ_QUESTIONS"; payload: PlayQuizQuestion[] }
  | {
      type: "SET_TIME_TAKEN";
      payload: { questionId: string; timeTaken: number }[];
    };

type PlayQuizContextType = {
  state: PlayQuizState;
  dispatch: React.Dispatch<PlayQuizActions>;
  resetQuiz: () => void;
};

const initialState: PlayQuizState = {
  currentQuestion: 0,
  playQuizQuestions: [],
  isStarterDialogOpen: { open: false, isStarted: false },
  isResultSheetOpen: false,
  quizMode: "waiting",
  userAnswer: null,
  timeTakenArray: null,
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
      const updatedTimeTakenArray = action.payload.map((newTimeTaken) => {
        const existing = state.timeTakenArray?.find(
          (time) => time.questionId === newTimeTaken.questionId
        );
        return existing || newTimeTaken;
      });
      return { ...state, timeTakenArray: updatedTimeTakenArray };
    default:
      return state;
  }
};

const QuizRoomContext = createContext<PlayQuizContextType | undefined>(
  undefined
);

export const PlayQuizProvider = ({
  children,
  quizProgress,
}: {
  children: React.ReactNode;
  quizProgress: PlayQuizType;
}) => {
  const [state, dispatch] = useReducer(quizRoomReducer, initialState);
  const { userAnswer, quizMode, playQuizQuestions, currentQuestion } = state;

  const playRightWorngAnswerSound = (isAnswerRight: boolean | null) => {
    if (isAnswerRight === null) return;
    const audio = new Audio(
      "/assets/sounds/zapsplat_multimedia_game_sound_slot_machine_mallet_chime_positive_win_001_65507.mp3"
    );
    console.log(audio);
    if (isAnswerRight) audio.play();
  };

  const resetQuiz = () => {
    const initialQuestions = quizProgress.quiz.questions.map((question) => {
      return { ...question, timeTaken: 0, isAnswerRight: null };
    });

    dispatch({ type: "SET_QUESTIONS", payload: initialQuestions });
    dispatch({
      type: "SET_QUIZ_MODE",
      payload: "playing",
    });
    dispatch({ type: "SET_CURRENT_QUESTION", payload: 0 });
  };

  const saveQuizProgressFun = useCallback(
    async (data: {
      playQuizQuestions: PlayQuizQuestion[];
      currentQuestion: number;
      isCompleted: boolean;
    }) => {
      await saveQuizProgress(quizProgress.quiz.id, {
        playQuizQuestions: data.playQuizQuestions,
        currentQuestion: data.currentQuestion,
        isCompleted: data.isCompleted,
      });
    },
    [quizProgress.quiz.id]
  );

  useEffect(() => {
    saveQuizProgressFun({
      playQuizQuestions,
      currentQuestion,
      isCompleted: quizMode === "ended",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  useEffect(() => {
    let initialQuestions: PlayQuizQuestion[];
    if (
      quizProgress.playQuizQuestions.length > 0 &&
      quizProgress.currentQuestion > 0
    ) {
      initialQuestions = quizProgress.playQuizQuestions as PlayQuizQuestion[];
      dispatch({
        type: "SET_IS_STARTER_DIALOG_OPEN",
        payload: { open: true, isStarted: false },
      });
    } else {
      initialQuestions = quizProgress.quiz.questions.map((question) => {
        return { ...question, timeTaken: 0, isAnswerRight: null };
      });
      dispatch({
        type: "SET_IS_STARTER_DIALOG_OPEN",
        payload: { open: true, isStarted: true },
      });
    }

    dispatch({
      type: "SET_CURRENT_QUESTION",
      payload: quizProgress.currentQuestion || 0,
    });
    dispatch({ type: "SET_QUESTIONS", payload: initialQuestions });
  }, [
    quizProgress.currentQuestion,
    quizProgress.isCompleted,
    quizProgress.playQuizQuestions,
    quizProgress.quiz.questions,
  ]);

  useEffect(() => {
    if (quizMode === "answered" && userAnswer) {
      let newPlayQuizQuestions: PlayQuizQuestion[];
      let isAnswerRight: boolean | null = null;
      switch (userAnswer.type) {
        case "PICK_ANSWER":
          isAnswerRight = userAnswer.answer.isCorrect;
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (currentQuestion === i && userAnswer.answer.isCorrect) {
              return {
                ...question,
                isAnswerRight,
              };
            } else {
              return question;
            }
          });

          break;
        case "SHORT_ANSWER":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (
              currentQuestion === i &&
              userAnswer.answer &&
              question.correctAnswer
            ) {
              isAnswerRight = !!stringSimilarity.compareTwoStrings(
                userAnswer.answer.toLowerCase().trim(),
                question.correctAnswer.toLowerCase().trim()
              );
              return {
                ...question,
                isAnswerRight,
              };
            } else {
              return question;
            }
          });

          break;
        case "TRUE_FALSE":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (currentQuestion === i && userAnswer.answer) {
              isAnswerRight = userAnswer.answer === question.correctAnswer;
              return {
                ...question,
                isAnswerRight,
              };
            } else {
              return question;
            }
          });

          break;
        case "CORRECT_ORDER":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            isAnswerRight =
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
              };
            } else {
              return question;
            }
          });

          break;
        case "MATCHING_PAIRS":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            isAnswerRight = userAnswer.answer.texts.every((textItem, i) => {
              return textItem.id === userAnswer.answer.matches[i].id;
            });
            if (currentQuestion === i && userAnswer.answer) {
              return {
                ...question,
                isAnswerRight,
                // timeTaken,
              };
            } else {
              return question;
            }
          });

          break;
        case "FILL_IN_THE_BLANKS":
          newPlayQuizQuestions = playQuizQuestions.map((question, i) => {
            if (currentQuestion === i && userAnswer.answer) {
              const blanks = question.items.filter((item) => item.isBlank);
              console.log(question.items);

              isAnswerRight =
                userAnswer.answer.every(
                  (answer, i) => answer.item.id === blanks[i].id
                ) && userAnswer.answer.length > 0;
              return {
                ...question,
                isAnswerRight,
                // timeTaken,
              };
            } else {
              return question;
            }
          });
      }
      dispatch({
        type: "SET_PLAY_QUIZ_QUESTIONS",
        payload: newPlayQuizQuestions,
      });
      setTimeout(
        () => {
          dispatch({ type: "SET_IS_RESULT_SHEET_OPEN", payload: true });
        },
        userAnswer.type === "MATCHING_PAIRS" ||
          userAnswer.type === "CORRECT_ORDER"
          ? 1200
          : 500
      );
      playRightWorngAnswerSound(isAnswerRight);
    }
    if (quizMode === "ended") {
      dispatch({ type: "SET_CURRENT_QUESTION", payload: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizMode]);

  return (
    <QuizRoomContext.Provider value={{ state, dispatch, resetQuiz }}>
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
