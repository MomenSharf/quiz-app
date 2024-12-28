import { saveEditorQuiz as saveEditorQuizServer } from "@/lib/actions/editor";
import { mapQuestionByType } from "@/lib/utils";
import { quizSchema, quizSchemaType } from "@/lib/validations/quizSchemas";
import { Category, EditorQuiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { DebouncedState, useDebouncedCallback } from "use-debounce";

type SaveStateType = "good" | "bad" | "waiting" | "offline";

// Define the state shape
type EditorState = {
  saveState: SaveStateType;
  historyArray: quizSchemaType[];
  currentQuestionId: string | null;
  settingsOpen: { open: boolean; type: "settings" | "publish" };
  isImageManagerTabsOpen: boolean;
  isImageEditorOpenWithFiles:
    | {
        isOpen: boolean;
        files: File[] | string;
        field: "imageUrl" | `questions.${number}.imageUrl`;
      }
    | { isOpen: boolean };
};

// Define action types
type EditorActions =
  | { type: "SET_SAVE_SATAT"; payload: SaveStateType }
  | {
      type: "SET_HISTORY_ARRAY";
      payload: { quiz: quizSchemaType; historyIndex: number };
    }
  | { type: "SET_CURRENT_QUESTION_ID"; payload: string }
  | {
      type: "SET_IS_SETTINGS_OPEN";
      payload: { open: boolean; type: "settings" | "publish" };
    }
  | { type: "SET_IS_QUESTIONS_IMAGE_MANAGER_OPEN"; payload: boolean }
  | { type: "SET_IS_IMAGE_MANAGER_TABS_OPEN"; payload: boolean }
  | {
      type: "SET_IS_IMAGE_EDITOR_OPEN";
      payload:
        | {
            isOpen: boolean;
            files: File[] | string;
            field: "imageUrl" | `questions.${number}.imageUrl`;
          }
        | { isOpen: boolean };
    };

// Define the context type
type EditorContextType = {
  state: EditorState;
  dispatch: React.Dispatch<EditorActions>;
  historyIndex: MutableRefObject<number>;
  form: UseFormReturn<quizSchemaType>;
  debounceSaveData: DebouncedState<(isReseting: boolean) => void>;
  redoFunction: () => void;
  undoFunction: () => void;
};

// Initial state
const initialState: EditorState = {
  saveState: "good",
  historyArray: [],
  currentQuestionId: null,
  settingsOpen: { open: false, type: "settings" },
  isImageManagerTabsOpen: false,
  isImageEditorOpenWithFiles: { isOpen: false },
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
    case "SET_CURRENT_QUESTION_ID":
      return { ...state, currentQuestionId: action.payload };
    case "SET_IS_SETTINGS_OPEN":
      return { ...state, settingsOpen: action.payload };
    case "SET_IS_IMAGE_MANAGER_TABS_OPEN": {
      return {
        ...state,
        isImageManagerTabsOpen: false,
      };
    }
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

  const { historyArray } = state;

  const initialValue = useMemo(() => {
    const mappedQuestions = initialQuiz.questions
      .map(mapQuestionByType)
      .sort((a, b) => a.questionOrder - b.questionOrder);

    return {
      id: initialQuiz.id,
      title: initialQuiz.title,
      description: initialQuiz.description,
      imageUrl: initialQuiz.imageUrl || '',
      visibility: initialQuiz.visibility,
      categories: initialQuiz.categories as Category[],
      questions: mappedQuestions,
    };
  }, [initialQuiz]);

  const form = useForm<quizSchemaType>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialValue,
  });

  const { getValues, watch, control } = form;

  useEffect(() => {
    dispatch({
      type: "SET_HISTORY_ARRAY",
      payload: { quiz: initialValue, historyIndex: historyIndex.current },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = getValues();

  const saveEditorQuiz = useCallback(
    async (isReseting: boolean) => {
      try {
        dispatch({ type: "SET_SAVE_SATAT", payload: "waiting" });

        const prismaQuiz = await saveEditorQuizServer(initialQuiz.id, data);

        if (prismaQuiz) {
          dispatch({ type: "SET_SAVE_SATAT", payload: "good" });

          if (!isReseting) {
            historyIndex.current = historyIndex.current + 1;
            dispatch({
              type: "SET_HISTORY_ARRAY",
              payload: { historyIndex: historyIndex.current, quiz: data },
            });
          }
        } else {
          dispatch({ type: "SET_SAVE_SATAT", payload: "bad" });
        }
      } catch (error: any) {
        dispatch({ type: "SET_SAVE_SATAT", payload: "bad" });
      }
    },
    [data, initialQuiz.id]
  );
  const debounceSaveData = useDebouncedCallback((isReseting: boolean) => {
    saveEditorQuiz(isReseting);
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

  useEffect(() => {
    dispatch({
      type: "SET_HISTORY_ARRAY",
      payload: { quiz: initialValue, historyIndex: historyIndex.current },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (
        name &&
        (name === "title" || //!! does not save correctly
          name === "description" ||
          name === "imageUrl" ||
          name === "visibility" ||
          name === "categories" || //!! does not save correctly
          name.startsWith("questions") ||
          name.startsWith("image"))
      ) {
        debounceSaveData(false);
      }
    });

    return () => {
      if (typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [debounceSaveData, watch, form]);

  useWatch({
    control,
    name: "questions",
  });

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_QUESTION_ID",
      payload: getValues("questions.0.id"),
    });
  }, [getValues]);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        historyIndex,
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
