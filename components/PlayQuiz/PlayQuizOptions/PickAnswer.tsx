import React, { useState } from "react";
import { PlayQuizQuestion } from "../Context";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export default function PickAnswer({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  
  return (
    <div
      className={cn("grid gap-3 items-center", {
        "grid-cols-2": question.items.length > 5,
      })}
    >
      {question.items.map((item) => {
        return (
          <motion.button
            key={item.id}
            className={cn(
              "py-3 px-4 rounded-xl bg-primary-foreground shadow-sm border border-transparent self-stretch flex items-center",
              {
                "bg-success/20 border-success": item.isCorrect,
                "bg-destructive/20 border-destructive": !item.isCorrect,
              }
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="font-medium ">A</span>
            <span className="flex-1">{item.text}</span>
            <span
              className={cn("rounded-full p-1", {
                "bg-success/90": item.isCorrect,
                "bg-destructive/90": !item.isCorrect,
              })}
            >
              {item.isCorrect ? (
                <Check className="w-3 h-3 text-white" />
              ) : (
                <X className="w-3 h-3 text-white" />
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
