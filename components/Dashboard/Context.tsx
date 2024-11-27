import {
  deleteQuizzes as deleteQuizzesServer,
  newFolder,
  newQuiz,
  duplicateQuiz as duplicateQuizServer,
  resetQuiz as resetQuizServer,
  renameQuiz as renameQuizServer,
  renameFolder as renameFolderServer,
  deleteFolder as deleteFolderServer,
} from "@/lib/actions/dashboard";
import { DashboardFoldersWithQuiz, DashboardQuiz } from "@/types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { toast } from "../ui/use-toast";

// Define the state shape
type DashboardState = {
  isCreatingQuiz: boolean;
  isCreatingFolder: boolean;
  isDeletingQuiz: boolean;
  isDeletingFolder: boolean;
  isDuplicatingQuiz: boolean;
  isResettingQuiz: boolean;
  isRenamingQuiz: boolean;
  isRenamingFolder: boolean;
  selectedQuizzesIds: string[];
};

// Define action types
type DashboardActions =
  | {
      type: "SET_IS_CREATING_QUIZ";
      payload: boolean;
    }
  | {
      type: "SET_IS_CREATING_Folder";
      payload: boolean;
    }
  | {
      type: "SET_IS_DELETING_QUIZ";
      payload: boolean;
    }
  | {
      type: "SET_IS_DELETING_FOLDER";
      payload: boolean;
    }
  | {
      type: "SET_IS_DUPLICATING_QUIZ";
      payload: boolean;
    }
  | {
      type: "SET_IS_RESETTING_QUIZ";
      payload: boolean;
    }
  | {
      type: "SET_IS_RENAMING_QUIZ";
      payload: boolean;
    }
  | {
      type: "SET_IS_RENAMING_FOLDER";
      payload: boolean;
    }
  | {
      type: "SET_SELECTED_QUIZZES_IDS";
      payload: string[];
    };

// Define the context type
type DashboardContextType = {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardActions>;
  quizzes: DashboardQuiz[];
  folderWithQuizzes: DashboardFoldersWithQuiz[];
  createQuiz: ({
    folderId,
    pathname,
  }: {
    folderId?: string | null;
    pathname: string;
  }) => Promise<void>;
  createFolder: ({
    title,
    parentId,
    pathname,
  }: {
    title: string;
    parentId?: string | null;
    pathname: string;
  }) => Promise<void>;
  toggleQuizSelection: (quizId: string) => void;
  deleteQuizzess: ({
    pathname,
    ids,
  }: {
    pathname: string;
    ids: string[];
  }) => Promise<void>;
  duplicateQuiz: ({
    pathname,
    quizId,
  }: {
    pathname: string;
    quizId: string;
  }) => Promise<void>;
  resetQuiz: ({
    pathname,
    quizId,
  }: {
    pathname: string;
    quizId: string;
  }) => Promise<void>;
  renameQuiz: ({
    pathname,
    quizId,
    newTitle,
  }: {
    pathname: string;
    quizId: string;
    newTitle: string;
  }) => Promise<void>;
  renameFolder: ({
    pathname,
    folderId,
    newTitle,
  }: {
    pathname: string;
    folderId: string;
    newTitle: string;
  }) => Promise<void>;
  deleteFolder: ({
    pathname,
    folderId,
  }: {
    pathname: string;
    folderId: string;
  }) => Promise<void>;
  toggleSelectAll: () => void;
};

// Initial state
const initialState: DashboardState = {
  isCreatingQuiz: false,
  isCreatingFolder: false,
  isDeletingQuiz: false,
  isDeletingFolder: false,
  isDuplicatingQuiz: false,
  isResettingQuiz: false,
  isRenamingFolder: false,
  isRenamingQuiz: false,

  selectedQuizzesIds: [],
};

// Reducer function to handle state updates
const DashboardReducer = (
  state: DashboardState,
  action: DashboardActions
): DashboardState => {
  switch (action.type) {
    case "SET_IS_CREATING_QUIZ":
      return { ...state, isCreatingQuiz: action.payload };
    case "SET_IS_CREATING_Folder":
      return { ...state, isCreatingFolder: action.payload };
    case "SET_IS_DELETING_QUIZ":
      return { ...state, isDeletingQuiz: action.payload };
    case "SET_IS_DELETING_FOLDER":
      return { ...state, isDeletingFolder: action.payload };
    case "SET_IS_DUPLICATING_QUIZ":
      return { ...state, isDuplicatingQuiz: action.payload };
    case "SET_IS_RESETTING_QUIZ":
      return { ...state, isResettingQuiz: action.payload };
    case "SET_IS_RENAMING_QUIZ":
      return { ...state, isRenamingQuiz: action.payload };
    case "SET_IS_RENAMING_FOLDER":
      return { ...state, isRenamingFolder: action.payload };
    case "SET_SELECTED_QUIZZES_IDS":
      return { ...state, selectedQuizzesIds: action.payload };
    default:
      return state;
  }
};

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// Define the provider component
export const DashboardProvider = ({
  children,
  quizzes,
  folderWithQuizzes,
}: {
  children: ReactNode;
  quizzes: DashboardQuiz[];
  folderWithQuizzes: DashboardFoldersWithQuiz[];
}) => {
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const { selectedQuizzesIds } = state;

  const createFolder = async ({
    title,
    parentId = null,
    pathname,
  }: {
    title: string;
    parentId?: string | null;
    pathname: string;
  }) => {
    dispatch({ type: "SET_IS_CREATING_Folder", payload: true });

    const { success, message } = await newFolder({ title, parentId, pathname });

    dispatch({ type: "SET_IS_CREATING_Folder", payload: false });
    if (success) {
      toast({ description: "Folder created successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }
  };
  const createQuiz = async ({
    folderId = null,
    pathname,
  }: {
    folderId?: string | null;
    pathname: string;
  }) => {
    dispatch({ type: "SET_IS_CREATING_QUIZ", payload: true });

    const { success, message } = await newQuiz({ folderId, pathname });

    dispatch({ type: "SET_IS_CREATING_QUIZ", payload: false });
    if (success) {
      toast({ description: "Quiz created successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }
  };
  const duplicateQuiz = async ({
    pathname,
    quizId,
  }: {
    pathname: string;
    quizId: string;
  }) => {
    dispatch({ type: "SET_IS_DUPLICATING_QUIZ", payload: true });

    const { success, message } = await duplicateQuizServer({
      quizId,
      pathname,
    });

    if (success) {
      toast({ description: "Quiz duplicated successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }

    dispatch({ type: "SET_IS_DUPLICATING_QUIZ", payload: false });
  };
  const deleteQuizzess = async ({
    pathname,
    ids,
  }: {
    pathname: string;
    ids: string[];
  }) => {
    dispatch({ type: "SET_IS_DELETING_QUIZ", payload: true });

    const { success, message } = await deleteQuizzesServer({
      quizzesIds: ids,
      pathname,
    });

    if (success) {
      toast({ description: "Quiz deleted successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }

    dispatch({ type: "SET_IS_DELETING_QUIZ", payload: false });
    dispatch({ type: "SET_SELECTED_QUIZZES_IDS", payload: [] });
  };
  const deleteFolder = async ({
    pathname,
    folderId,
  }: {
    pathname: string;
    folderId: string;
  }) => {
    dispatch({ type: "SET_IS_DELETING_FOLDER", payload: true });

    const { success, message } = await deleteFolderServer({
      folderId,
      pathname,
    });

    if (success) {
      toast({ description: "folder deleted successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }

    dispatch({ type: "SET_IS_DELETING_FOLDER", payload: false });
  };
  const resetQuiz = async ({
    pathname,
    quizId,
  }: {
    pathname: string;
    quizId: string;
  }) => {
    dispatch({ type: "SET_IS_RESETTING_QUIZ", payload: true });

    const { success, message } = await resetQuizServer({
      quizId,
      pathname,
    });

    if (success) {
      toast({ description: "Quiz reseted successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }
    dispatch({ type: "SET_IS_RESETTING_QUIZ", payload: false });
  };

  const toggleQuizSelection = (quizId: string) => {
    if (selectedQuizzesIds.includes(quizId)) {
      dispatch({
        type: "SET_SELECTED_QUIZZES_IDS",
        payload: selectedQuizzesIds.filter((id) => id !== quizId),
      });
    } else {
      dispatch({
        type: "SET_SELECTED_QUIZZES_IDS",
        payload: [...selectedQuizzesIds, quizId],
      });
    }
  };
  const toggleSelectAll = () => {
    if (selectedQuizzesIds.length === quizzes.length) {
      dispatch({ type: "SET_SELECTED_QUIZZES_IDS", payload: [] });
    } else {
      dispatch({
        type: "SET_SELECTED_QUIZZES_IDS",
        payload: quizzes.map((quiz) => quiz.id),
      });
    }
  };
  const renameQuiz = async ({
    pathname,
    quizId,
    newTitle,
  }: {
    pathname: string;
    quizId: string;
    newTitle: string;
  }) => {
    dispatch({ type: "SET_IS_RENAMING_QUIZ", payload: true });

    const { success, message } = await renameQuizServer({
      quizId,
      newTitle,
      pathname,
    });

    if (success) {
      toast({ description: "Quiz renamed successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }
    dispatch({ type: "SET_IS_RENAMING_QUIZ", payload: false });
  };

  const renameFolder = async ({
    pathname,
    folderId,
    newTitle,
  }: {
    pathname: string;
    folderId: string;
    newTitle: string;
  }) => {
    dispatch({ type: "SET_IS_RENAMING_FOLDER", payload: true });
    const { success, message } = await renameFolderServer({
      folderId,
      newTitle,
      pathname,
    });
    if (success) {
      toast({ description: "Folder renamed successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });

      dispatch({ type: "SET_IS_RENAMING_FOLDER", payload: false });
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        state,
        dispatch,
        quizzes,
        folderWithQuizzes,
        createQuiz,
        createFolder,
        toggleQuizSelection,
        deleteQuizzess,
        duplicateQuiz,
        toggleSelectAll,
        resetQuiz,
        renameQuiz,
        renameFolder,
        deleteFolder
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook for using the Dashboard context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within an DashboardProvider"
    );
  }
  return context;
};
