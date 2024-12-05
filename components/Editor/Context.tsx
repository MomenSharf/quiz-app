import { saveEditorQuiz } from "@/lib/actions/quiz.actions";
import { mapQuestionByType } from "@/lib/utils";
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
import { Category, QuestionType } from "@prisma/client";
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
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

type SaveStateType = "GOOD" | "BAD" | "WAITING";

// Define the state shape
type EditorState = {
  saveState: SaveStateType;
  historyArray: quizSchemaType[];
  currentQuestionId: string | null;
  isSettingsOpen: boolean;
  isImageEditorOpenWithFiles: {
    isOpen: boolean;
    files?: File[];
    questionIndex?: number;
    url?: string;
  };
};

// Define action types
type EditorActions =
  | { type: "SET_SAVE_SATAT"; payload: SaveStateType }
  | {
      type: "SET_HISTORY_ARRAY";
      payload: { quiz: quizSchemaType; historyIndex: number };
    }
  | { type: "SET_CURRENT_QUESTION"; payload: string }
  | { type: "SET_IS_SETTINGS_OPEN"; payload: boolean }
  // | { type: "SET_IS_UNDO_OR_REDO"; payload: boolean }
  // | { type: "SET_IS_REORDERED"; payload: boolean }
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
  // isUndoOrRedo: MutableRefObject<boolean>;
  // headerRef: RefObject<HTMLDivElement>;
  // sidebarRef: RefObject<HTMLDivElement>;
  form: UseFormReturn<quizSchemaType>;
  debounceSaveData: DebouncedState<(isReseting: boolean) => void>;
  redoFunction: () => void;
  undoFunction: () => void;
};

// Initial state
const initialState: EditorState = {
  saveState: "GOOD",
  historyArray: [],
  currentQuestionId: null,
  // isEditingTitle: false,
  isSettingsOpen: false,
  isImageEditorOpenWithFiles: { isOpen: false },
  // isImageManagerOpen: false,
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

    case "SET_IS_SETTINGS_OPEN":
      return { ...state, isSettingsOpen: action.payload };
    case "SET_IS_IMAGE_EDITOR_OPEN":
      return { ...state, isImageEditorOpenWithFiles: action.payload };

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
  // const headerRef = useRef<HTMLDivElement>(null);
  // const sidebarRef = useRef<HTMLDivElement>(null);

  const { historyArray } = state;

  const initialValue = useMemo(() => {
    const mappedQuestions = initialQuiz.questions
      .map(mapQuestionByType)
      .sort((a, b) => a.questionOrder - b.questionOrder);

    return {
      id: initialQuiz.id,
      title: initialQuiz.title,
      description: initialQuiz.description,
      image: initialQuiz.image || undefined,
      visibility: initialQuiz.visibility,
      categories: initialQuiz.categories as Category[],
      questions: mappedQuestions,
    };
  }, [initialQuiz]);

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
        // isUndoOrRedo,
        // headerRef,
        // sidebarRef,
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
