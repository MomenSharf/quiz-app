import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type DifficultySelectorPros = {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  onFieldChange: (e: string) => void;
};

export default function DifficultySelector({
  difficulty,
  onFieldChange,
}: DifficultySelectorPros) {
  return (
    <div className="flex gap-3">
      <Button
        type="button"
        size="lg"
        className={cn("bg-green-600 hover:bg-green-600 transition-all", {
          "opacity-30 hover:opacity-100": difficulty !== "EASY",
        })}
        onClick={() => onFieldChange("EASY")}
      >
        Easy
      </Button>
      <Button
        type="button"
        size="lg"
        className={cn("bg-yellow-400 hover:bg-yellow-400 transition-all", {
          "opacity-30 hover:opacity-100": difficulty !== "MEDIUM",
        })}
        onClick={() => onFieldChange("MEDIUM")}
      >
        Medium
      </Button>
      <Button
        type="button"
        size="lg"
        className={cn("bg-destructive hover:bg-destructive transition-all", {
          "opacity-30 hover:opacity-100": difficulty !== "HARD",
        })}
        onClick={() => onFieldChange("HARD")}
      >
        Hard
      </Button>
    </div>
  );
}
