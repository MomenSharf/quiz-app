import React from "react";
import { Button } from "../ui/button";
import { usePlayQuizContext } from "./Context";

export default function Footer() {
  const {
    dispatch,
    state: { currentQuestion },
  } = usePlayQuizContext();
  return (
    <div className="p-3 ">
      <Button
        onClick={() => {
          dispatch({
            type: "SET_CURRENT_QUESTION",
            payload: currentQuestion + 1,
          });
        }}
      >
        Next
      </Button>
    </div>
  );
}
