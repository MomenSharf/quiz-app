'use client';

import { cn } from "@/lib/utils";
import { ThemeState } from "@/types/theme";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

type ThemeActions =
  | { type: "SET_THEME"; payload: ThemeState }
  | { type: "SET_MODE"; payload: ThemeState }
  | { type: "TOGGLED_MODE" }; // ❌ no payload needed here

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
  const [hydrated, setHydrated] = useState(false);
  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const localData = localStorage.getItem("ThemeStat");
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (parsed.theme && parsed.mode) {
          dispatch({ type: "SET_THEME", payload: parsed });
          dispatch({ type: "SET_MODE", payload: parsed });
        }
      } catch (err) {
        console.error("Failed to parse theme from localStorage", err);
      }
    }
    setHydrated(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("ThemeStat", JSON.stringify(state));
    }
  }, [state, hydrated]);

  if (!hydrated) return null; 

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
