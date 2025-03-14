import React from "react";
import UseScrollerContainer from "../Shared/UseScrollerContainer";
import { SearchQuiz } from "@/types";
import QuizzesCard from "./QuizCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { MotionDiv } from "@/hooks/useMotion";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import QuizzesCardSkeleton from "./QuizCardSkeleton";

export default function QuizzesCardsScrollerSkeleton({
  title,
  route,
}: {
  title: string;
  route: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between gap-3">
        <h2>{title}</h2>
        <Link
          href={route}
          className={cn(buttonVariants({ size: "sm", variant: "link" }))}
        >
          See more
        </Link>
      </div>
      <UseScrollerContainer
        scrollBy={300}
        className="flex gap-3 overflow-x-scroll"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <QuizzesCardSkeleton key={i} />
        ))}
      </UseScrollerContainer>
    </div>
  );
}
