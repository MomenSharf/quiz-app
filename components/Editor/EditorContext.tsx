import { saveQuiz } from "@/lib/actions/quiz.actions";
import {
  codeSchema,
  fillInTheBlankSchema,
  matchingPairsSchema,
  multipleChoiceSchema,
  pickImageSchema,
  questionOrderSchema,
  quizSchema,
  quizSchemaType,
  shortAnswerSchema,
  singleChoiceSchema,
  trueFalseSchema,
  unselectedSchema
} from "@/lib/validations/quizSchemas";
import {  EditorQuiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionType } from "@prisma/client";
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
interface EditorState {
  saveState: "GOOD" | "BAD" | "WAITING" | "OFFLINE";
  historyArray: quizSchemaType[];
  currentQuestion: number;
  currentQuestionTab: string
  isEditingTitle: boolean;
  isOnline: boolean;
  isImageEditorOpenWithFiles: { isOpen: boolean; files?: File[], questionIndex?: number, url?: string };
  isQuestionImageManagerTabsOpen: boolean;
}

// Define action types
type EditorAction =
  | { type: "SET_SAVE_SATAT"; payload: "GOOD" | "BAD" | "WAITING" | "OFFLINE" }
  | {
      type: "SET_HISTORY_ARRAY";
      payload: { quiz: quizSchemaType; historyIndex: number };
    }
  | { type: "SET_IS_EDITING_TITLE"; payload: boolean }
  | { type: "SET_CURRENT_QUESTION"; payload: number }
  | { type: "SET_IS_UNDO_OR_REDO"; payload: boolean }
  | { type: "SET_IS_QUESTION_IMAGE_MANAGER_TABS_OPEN"; payload: boolean }
  | { type: "SET_CURRENT_QUESTION_TAB"; payload: string }
  | {
      type: "SET_IS_IMAGE_EDITOR_OPEN";
      payload: { isOpen: boolean; files?: File[], questionIndex?: number, url?: string };
      
    };

// Define the context type
interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  historyIndex: MutableRefObject<number>;
  isUndoOrRedo: MutableRefObject<boolean>;
  headerRef: RefObject<HTMLDivElement>;
  sidebarRef: RefObject<HTMLDivElement>;
  form: UseFormReturn<quizSchemaType>;
  debounceSaveData: DebouncedState<(isReseting: boolean) => void>;
  redoFunction: () => void;
  undoFunction: () => void;
}

// Initial state
const initialState: EditorState = {
  saveState: "GOOD",
  historyArray: [],
  currentQuestion: 0,
  isEditingTitle: false,
  isOnline: true,
  isImageEditorOpenWithFiles: { isOpen: false },
  isQuestionImageManagerTabsOpen: false,
  currentQuestionTab: 'content'
};

// Reducer function to handle state updates
const editorReducer = (
  state: EditorState,
  action: EditorAction
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
      imageUrl: initialQuiz.imageUrl ?? undefined,
      visibility: initialQuiz.visibility,
      categories: initialQuiz.categories,
      difficulty: initialQuiz.difficulty,
      questions: initialQuiz.questions
        .map((question) => {
          switch (question.type) {
            case QuestionType.UNSELECTED:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
              } as z.infer<typeof unselectedSchema>;

            case QuestionType.SINGLE_CHOICE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                options: question.options ?? [],
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof singleChoiceSchema>;

            case QuestionType.MULTIPLE_CHOICE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                options: question.options ?? [],
                correctAnswers: question.correctAnswers ?? [],
              } as z.infer<typeof multipleChoiceSchema>;

            case QuestionType.TRUE_FALSE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
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
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof fillInTheBlankSchema>;

            case QuestionType.SHORT_ANSWER:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof shortAnswerSchema>;

            case QuestionType.MATCHING_PAIRS:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                pairs: question.pairs ?? [],
              } as z.infer<typeof matchingPairsSchema>;

            case QuestionType.ORDER:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                correctOrder: question.correctOrder ?? [],
              } as z.infer<typeof questionOrderSchema>;

            case QuestionType.PICK_IMAGE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                imagesOptions: question.imagesOptions ?? [],
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof pickImageSchema>;

            case QuestionType.CODE:
              return {
                id: question.id,
                type: question.type,
                questionOrder: question.questionOrder,
                imageUrl: question.imageUrl,
                question: question.question ?? "",
                codeSnippet: question.codeSnippet ?? "",
                correctAnswer: question.correctAnswer ?? "",
              } as z.infer<typeof codeSchema>;

            default:
              return {
                id: question.id,
                type: QuestionType.UNSELECTED,
                questionOrder: question.questionOrder,
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

  useEffect(() => {
    dispatch({
      type: "SET_HISTORY_ARRAY",
      payload: { quiz: initialValue, historyIndex: historyIndex.current },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveQuizFun = useCallback(
    async (isReseting: boolean) => {
      const data = form.getValues();

      try {
        dispatch({ type: "SET_SAVE_SATAT", payload: "WAITING" });

        const prismaQuiz = await saveQuiz(initialQuiz.id, data, "pathname");

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
      }
    },
    [form, initialQuiz.id]
  );
  const debounceSaveData = useDebouncedCallback((isReseting: boolean) => {
    saveQuizFun(isReseting);
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
