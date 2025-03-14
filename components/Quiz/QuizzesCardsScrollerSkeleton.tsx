import React from "react";
import UseScrollerContainer from "../Shared/UseScrollerContainer";
import { SearchQuiz } from "@/types";
import QuizzesCard from "./QuizCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { MotionDiv } from "@/hooks/useMotion";
import { Skeleton } from "../ui/skeleton";
import {motion} from 'framer-motion'

export default function QuizzesCardsScrollerSkeleton({
  title,
  route,
}: {
  title: string;
  route: string;
}) {
  return (
    <div
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
      <UseScrollerContainer
        scrollBy={300}
        className="flex gap-3 overflow-x-scroll"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }} // Ensures it animates only once
            key={i}
            className="min-w-44 w-44 sm:min-w-52 sm:w-52 bg-card rounded-xl flex flex-col"
          >
            <div className="p-2">
              <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>
            <div className="p-2 pb-4 flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex flex-col gap-1 w-[80%]">
                  <Skeleton className="h-3 w-full rounded-full" />
                  <Skeleton className="h-2 w-[50%] rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-3">
                <div>
                  <Skeleton className="h-3 w-14 rounded-xl" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-3 w-14 rounded-xl" />
                </div>
                <div>
                  <Skeleton className="h-3 w-14 rounded-xl" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-3 w-14 rounded-xl" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </UseScrollerContainer>
    </div>
  );
}
