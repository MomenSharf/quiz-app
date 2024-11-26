import { newFolder, newQuiz } from "@/lib/actions/dashboard";
import { DashboardFoldersWithQuiz, DashboardQuiz } from "@/types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { toast } from "../ui/use-toast";

// Define the state shape
type DashboardState = {
  isCreatingQuiz: boolean;
  isCreatingFolder: boolean;
  isNewFolderDialogOpen: boolean;
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
      type: "SET_IS_NEW_FOLDER_DIALOG_OPEN";
      payload: boolean;
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
  createFolder: ({ title, parentId, pathname, }: {
    title: string;
    parentId?: string | null;
    pathname: string;
}) => Promise<void>
};

// Initial state
const initialState: DashboardState = {
  isCreatingQuiz: false,
  isCreatingFolder: false,
  isNewFolderDialogOpen: false,
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
    case "SET_IS_NEW_FOLDER_DIALOG_OPEN":
      return {
        ...state,
        isNewFolderDialogOpen: action.payload,
      };
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

  const createFolder = async ({
    title,
    parentId = null,
    pathname,
  }: {
    title: string;
    parentId?: string | null;
    pathname: string;
  }) => {
    dispatch({ type: "SET_IS_CREATING_QUIZ", payload: true });

    try {
      const { success } = await newFolder({ title, parentId, pathname });

      dispatch({ type: "SET_IS_CREATING_Folder", payload: false });
      if (success) {
        toast({ description: "Folder created successfully" });
      } else {
        toast({
          description: "Error creating folder",
          title: "error",
          variant: "destructive",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_IS_CREATING_Folder", payload: false });
      toast({
        description: "Error creating folder",
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

    try {
      const { success } = await newQuiz({ folderId, pathname });

      dispatch({ type: "SET_IS_CREATING_QUIZ", payload: false });
      if (success) {
        toast({ description: "Quiz created successfully" });
      } else {
        toast({
          description: "Error creating quiz",
          title: "error",
          variant: "destructive",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_IS_CREATING_QUIZ", payload: false });
      toast({
        description: "Error creating quiz",
        title: "error",
        variant: "destructive",
      });
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
        createFolder
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
