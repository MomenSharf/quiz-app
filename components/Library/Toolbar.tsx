import React, { useState } from "react";
import DeleteQuizButton from "./Quiz/DeleteQuizButton";
import { Trash2, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useLibraryContext } from "./Context";
import SortBy from "./SortBy";
import { cn } from "@/lib/utils";

export default function Toolbar() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    dispatch,
    state: { selectedQuizzesIds },
  } = useLibraryContext();
  return (
    <div className="flex gap-3 items-center">
      <div className="w-full flex gap-1 sm:gap-3 items-center justify-between">
        {selectedQuizzesIds.length !== 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="gap-1 text-xs rounded-xl disabled:cursor-not-allowed cursor-pointer"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        )}
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
      <DeleteQuizButton
        ids={selectedQuizzesIds}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
    </div>
  );
}
