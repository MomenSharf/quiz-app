import React from "react";
import UseScrollerContainer from "../Shared/UseScrollerContainer";
import { SearchQuiz } from "@/types";
import QuizzesCard from "./QuizCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { MotionDiv } from "@/hooks/useMotion";

export default function QuizzesCardsScroller({
  quizzes,
  title,
  route,
}: {
  quizzes: SearchQuiz[];
  title: string;
  route: string;
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }} // Ensures it animates only once
      className="flex flex-col gap-1"
    >
      <div className="flex justify-between gap-3">
        <h2>{title}</h2>
        <Link
          href={route}
          className={cn(buttonVariants({ size: "sm", variant: "link" }))}
        >
          See more
        </Link>
      </div>
      <UseScrollerContainer scrollBy={300}>
        {quizzes.map((quiz, i) => (
          <QuizzesCard key={quiz.id} quiz={quiz} index={i} />
        ))}
      </UseScrollerContainer>
    </MotionDiv>
  );
}
