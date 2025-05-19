"use client";

import { cn } from "@/lib/utils";
import { ThemeState } from "@/types/theme";
import { createContext, ReactNode, useContext, useReducer } from "react";

type ThemeActions =
  | { type: "SET_THEME"; payload: ThemeState }
  | { type: "SET_MODE"; payload: ThemeState }
  | { type: "TOGGLED_MODE" };

interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeActions>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const ThemeReducer = (state: ThemeState, action: ThemeActions): ThemeState => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload.theme,
      };
    case "SET_MODE":
      return {
        ...state,
        mode: action.payload.mode,
      };
    case "TOGGLED_MODE":
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

const initialState: ThemeState = {
  theme: "violet",
  mode: "light",
};

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <body
        data-theme-color={state.theme}
        className={cn(state.mode, "min-h-screen")}
      >
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeContextProvider");
  }

  return context;
};
