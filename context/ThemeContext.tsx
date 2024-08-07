"use client";
import { ThemeState } from "@/types/theme";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { cn } from "@/lib/utils";

import { Nunito } from "next/font/google";


const nunito = Nunito({ subsets: ["latin"] });

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
      <body data-theme-color={state.theme} className={cn(state.mode,nunito.className,'min-h-screen')}>
      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
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