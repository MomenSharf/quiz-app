import { saveEditorQuiz } from "@/lib/actions/quiz.actions";
import {
  fillInTheBlankSchema,
  matchingPairsSchema,
  pickAnswerSchema,
  questionOrderSchema,
  quizSchema,
  quizSchemaType,
  shortAnswerSchema,
  trueFalseSchema,
  unselectedSchema,
} from "@/lib/validations/quizSchemas";
import { EditorQuiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Question, QuestionType } from "@prisma/client";
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { DebouncedState, useDebouncedCallback } from "use-debounce";
import { z } from "zod";

// Define the state shape
type EditorState = {
  saveState: "GOOD" | "BAD" | "WAITING" | "OFFLINE";
  historyArray: quizSchemaType[];
  currentQuestion: string;
  isSettingsOpen: boolean;
  currentQuestionTab: string;
  isEditingTitle: boolean;
  isOnline: boolean;
  isImageEditorOpenWithFiles: {
    isOpen: boolean;
    files?: File[];
    questionIndex?: number;
    url?: string;
  };
  isQuestionImageManagerTabsOpen: boolean;
};

// Define action types
type EditorActions =
  | { type: "SET_SAVE_SATAT"; payload: "GOOD" | "BAD" | "WAITING" | "OFFLINE" }
  | {
      type: "SET_HISTORY_ARRAY";
      payload: { quiz: quizSchemaType; historyIndex: number };
    }
  | { type: "SET_IS_EDITING_TITLE"; payload: boolean }
  | { type: "SET_CURRENT_QUESTION"; payload: string }
  | { type: "SET_IS_SETTINGS_OPEN"; payload: boolean }
  | { type: "SET_IS_UNDO_OR_REDO"; payload: boolean }
  | { type: "SET_IS_REORDERED"; payload: boolean }
  | { type: "SET_IS_QUESTION_IMAGE_MANAGER_TABS_OPEN"; payload: boolean }
  | { type: "SET_CURRENT_QUESTION_TAB"; payload: string }
  | {
      type: "SET_IS_IMAGE_EDITOR_OPEN";
      payload: {
        isOpen: boolean;
        files?: File[];
        url?: string;
      };
    };

// Define the context type
type EditorContextType = {
  state: EditorState;
  dispatch: React.Dispatch<EditorActions>;
  historyIndex: MutableRefObject<number>;
  isUndoOrRedo: MutableRefObject<boolean>;
  headerRef: RefObject<HTMLDivElement>;
  sidebarRef: RefObject<HTMLDivElement>;
  form: UseFormReturn<quizSchemaType>;
  debounceSaveData: DebouncedState<(isReseting: boolean) => void>;
  redoFunction: () => void;
  undoFunction: () => void;
};

// Initial state
const initialState: EditorState = {
  saveState: "GOOD",
  historyArray: [],
  currentQuestion: "",
  isEditingTitle: false,
  isSettingsOpen: false,
  isOnline: true,
  isImageEditorOpenWithFiles: { isOpen: false },
  isQuestionImageManagerTabsOpen: false,
  currentQuestionTab: "content",
};

// Reducer function to handle state updates
const editorReducer = (
  state: EditorState,
  action: EditorActions
): EditorState => {
  switch (action.type) {
    case "SET_SAVE_SATAT":
      return { ...state, saveState: action.payload };
    case "SET_HISTORY_ARRAY":
      return {
        ...state,
        historyArray: [
          ...state.historyArray.slice(0, action.payload.historyIndex),
          action.payload.quiz,
        ],
      };
    case "SET_IS_EDITING_TITLE":
      return { ...state, isEditingTitle: action.payload };
    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: action.payload };
    case "SET_CURRENT_QUESTION_TAB":
      return { ...state, currentQuestionTab: action.payload };
    case "SET_IS_SETTINGS_OPEN":
      return { ...state, isSettingsOpen: action.payload };
    case "SET_IS_IMAGE_EDITOR_OPEN":
      return { ...state, isImageEditorOpenWithFiles: action.payload };
    case "SET_IS_QUESTION_IMAGE_MANAGER_TABS_OPEN":
      return { ...state, isQuestionImageManagerTabsOpen: action.payload };
    default:
      return state;
  }
};

// Create the context
const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Define the provider component
export const EditorProvider = ({
  children,
  initialQuiz,
}: {
  children: ReactNode;
  initialQuiz: EditorQuiz;
}) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const historyIndex = useRef(0);
  const isUndoOrRedo = useRef(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { historyArray } = state;

  const initialValue = useMemo(
    () => ({
      id: initialQuiz.id,
      title: initialQuiz.title,
      description: initialQuiz.description,
      image: initialQuiz.image || undefined,
      visibility: initialQuiz.visibility,
      categories: initialQuiz.categories as Category[],
      questions: initialQuiz.questions
        .map((question) => {
          switch (question.type) {
            case QuestionType.UNSELECTED:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
              } as z.infer<typeof unselectedSchema>;

            case QuestionType.PICK_ANSWER:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
                image: question.image || undefined,
                question: question.question ?? "",
                items: question.items.map((e) => ({
                  id: e.id,
                  text: e.text,
                  isCorrect: e.isCorrect || false,
                })),
              } as z.infer<typeof pickAnswerSchema>;

            case QuestionType.TRUE_FALSE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
                image: question.image || undefined,
                question: question.question ?? "",
                correctAnswer: (question.correctAnswer ?? "true") as
                  | "true"
                  | "false",
              } as z.infer<typeof trueFalseSchema>;

            case QuestionType.FILL_IN_THE_BLANK:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
                image: question.image || undefined,
                question: question.question ?? "",
                items: question.items.map((e) => ({
                  id: e.id,
                  text: e.text,
                  isBlank: e.isBlank,
                })),
              } as z.infer<typeof fillInTheBlankSchema>;

            case QuestionType.SHORT_ANSWER:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
                image: question.image || undefined,
                question: question.question ?? "",
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof shortAnswerSchema>;

            case QuestionType.MATCHING_PAIRS:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
                image: question.image || undefined,
                question: question.question ?? "",
                items: question.items.map((e) => ({
                  id: e.id,
                  text: e.text,
                  match: e.match,
                })),
              } as z.infer<typeof matchingPairsSchema>;

            case QuestionType.ORDER:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
                image: question.image || undefined,
                question: question.question ?? "",
                items: question.items.map((e) => ({
                  id: e.id,
                  text: e.text,
                  order: e.order,
                })),
              } as z.infer<typeof questionOrderSchema>;

            default:
              return {
                id: question.id,
                type: QuestionType.UNSELECTED,
                questionOrder: question.questionOrder,
                timeLimit: question.timeLimit,
                points: question.points,
              } as z.infer<typeof unselectedSchema>;
          }
        })
        .sort((a, b) => a.questionOrder - b.questionOrder),
    }),
    [initialQuiz]
  );

  const form = useForm<quizSchemaType>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialValue,
  });

  const { getValues } = form;

  useEffect(() => {
    dispatch({
      type: "SET_HISTORY_ARRAY",
      payload: { quiz: initialValue, historyIndex: historyIndex.current },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveEditorQuizFun = useCallback(
    async (isReseting: boolean) => {
      const data = getValues();
      try {
        dispatch({ type: "SET_SAVE_SATAT", payload: "WAITING" });

        const prismaQuiz = await saveEditorQuiz(
          initialQuiz.id,
          data,
          "pathname"
        );

        if (prismaQuiz) {
          dispatch({ type: "SET_SAVE_SATAT", payload: "GOOD" });

          if (!isReseting) {
            historyIndex.current = historyIndex.current + 1;
            dispatch({
              type: "SET_HISTORY_ARRAY",
              payload: { historyIndex: historyIndex.current, quiz: data },
            });
          }
        } else {
          dispatch({ type: "SET_SAVE_SATAT", payload: "BAD" });
        }
      } catch (error: any) {
        dispatch({ type: "SET_SAVE_SATAT", payload: "BAD" });
        console.log(error);
      }
    },
    [getValues, initialQuiz.id]
  );
  const debounceSaveData = useDebouncedCallback((isReseting: boolean) => {
    saveEditorQuizFun(isReseting);
  }, 1500);

  const undoFunction = useCallback(() => {
    if (historyIndex.current > 0) {
      historyIndex.current = historyIndex.current - 1;
      isUndoOrRedo.current = true;
      form.reset(historyArray[historyIndex.current]);
      debounceSaveData(true);
    }
  }, [debounceSaveData, form, historyArray]);

  const redoFunction = useCallback(() => {
    if (historyIndex.current < historyArray.length) {
      historyIndex.current = historyIndex.current + 1;
      isUndoOrRedo.current = true;
      form.reset(historyArray[historyIndex.current]);
      debounceSaveData(true);
    }
  }, [debounceSaveData, form, historyArray]);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        historyIndex,
        isUndoOrRedo,
        headerRef,
        sidebarRef,
        form,
        debounceSaveData,
        redoFunction,
        undoFunction,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// Custom hook for using the editor context
export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};
