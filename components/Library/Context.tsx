
import { DashboardFoldersWithQuiz, DashboardQuiz } from "@/types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { toast } from "../ui/use-toast";

// Define the state shape
type LibraryState = {
  selectedQuizzesIds: string[];
};

// Define action types
type DashboardActions = {
  type: "SET_SELECTED_QUIZZES_IDS";
  payload: string[];
};

// Define the context type
type LibraryContextType = {
  state: LibraryState;
  dispatch: React.Dispatch<DashboardActions>;
  quizzes: DashboardQuiz[];
  folderWithQuizzes: DashboardFoldersWithQuiz[];
};

// Initial state
const initialState: LibraryState = {
  selectedQuizzesIds: [],
};

// Reducer function to handle state updates
const DashboardReducer = (
  state: LibraryState,
  action: DashboardActions
): LibraryState => {
  switch (action.type) {
    case "SET_SELECTED_QUIZZES_IDS":
      return { ...state, selectedQuizzesIds: action.payload };
    default:
      return state;
  }
};

// Create the context
const LibraryContext = createContext<LibraryContextType | undefined>(
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

  return (
    <LibraryContext.Provider
      value={{
        state,
        dispatch,
        quizzes,
        folderWithQuizzes,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

// Custom hook for using the Dashboard context
export const useLibraryContext = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error(
      "useLibraryContext must be used within an DashboardProvider"
    );
  }
  return context;
};
