import React from "react";
import DeleteQuizButton from "./Quiz/DeleteQuizButton";
import { Trash2, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useDashboardContext } from "./Context";
import SortBy from "./SortBy";
import { cn } from "@/lib/utils";

export default function Toolbar() {
  const {
    dispatch,
    state: { selectedQuizzesIds },
  } = useDashboardContext();
  return (
    <div className="flex gap-3 items-center">
      <div className="w-full flex gap-3 items-center">
        <DeleteQuizButton
          pathname="/dashboard"
          className={cn(buttonVariants({size: 'sm', variant: 'destructive'}),"gap-1 text-xs rounded-xl disabled:cursor-not-allowed cursor-pointer")}
          disabled={selectedQuizzesIds.length === 0}
          ids={selectedQuizzesIds}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </DeleteQuizButton>
        {selectedQuizzesIds.length !== 0 && (
          <div className="text-xs text-gray-medium">
            {selectedQuizzesIds.length} selected{" "}
            {selectedQuizzesIds.length === 1 ? "Quiz" : "Quizzes"}
            <Button
              variant="outline"
              size="sm"
              className="p-1 ml-1 h-auto"
              onClick={() =>
                dispatch({ type: "SET_SELECTED_QUIZZES_IDS", payload: [] })
              }
            >
              <X className="w-3 h-3 text-gray-medium" />
            </Button>
          </div>
        )}
        <div className="ml-auto">
          <SortBy />
        </div>
      </div>
    </div>
  );
}
