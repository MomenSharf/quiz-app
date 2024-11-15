"use client";
import { cn } from "@/lib/utils";
import { ThemeState } from "@/types/theme";
import { createContext, ReactNode, useContext, useReducer } from "react";


type ThemeActions =
  | { type: "SET_THEME"; payload: ThemeState | null }
  | { type: "SET_MODE"; payload: ThemeState | null }
  | { type: "TOGGLED_MODE"; payload: ThemeState | null };

interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeActions>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const ThemeReducer = (state: ThemeState, actions: ThemeActions): ThemeState => {
  switch (actions.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: actions.payload ? actions.payload.theme : state.theme,
      };
    case "SET_MODE":
      return {
        ...state,
        mode: actions.payload ? actions.payload.mode : state.mode,
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
      <body data-theme-color={state.theme} className={cn(state.mode,'min-h-screen')}>
     
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if(!context) {
    throw Error('useThemeContext must be used inside ThemeContextProvider')
  }

  return context
}