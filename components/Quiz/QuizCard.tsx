"use client";
import React, { useEffect, useRef, useState } from "react";
import QuizImage from "./QuizImage";
import { EditorQuiz } from "@/types";
import Image from "next/image";
import { UserAvatarImage } from "../User/UserAvatar";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Bookmark,
  Copy,
  Heart,
  Send,
  Timer,
} from "lucide-react";
import { cn, formatToMinSec } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function QuizCard({ quiz }: { quiz: EditorQuiz }) {
  const sessiom = useSession();
  // console.log(quiz);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const quizTime = quiz.questions.reduce(
    (acc, curr) => acc + curr.timeLimit,
    0
  );

  useEffect(() => {
    if (!descriptionRef.current) return;
    const lineHeight = parseFloat(
      getComputedStyle(descriptionRef.current).lineHeight
    );
    const contentHeight = descriptionRef.current.scrollHeight;
    if (contentHeight > lineHeight * 3) {
      setIsShowMoreVisible(true);
      console.log(contentHeight);
      console.log(lineHeight);
    }
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center p-5 bg-white rounded-xl">
      <QuizImage imageUrl="" />
      <div className="lg:col-span-2 flex flex-col gap-2 justify-between">
        <div className="flex items-center gap-1">
          <UserAvatarImage imageUrl={""} className="w-10 h-10" />
          <span className="text-xs text-gray-500 font-medium">
            {quiz.user.username} {' '}
            {quiz.user.id === sessiom.data?.user.id && (
               <Badge className="font-thin">
              You
             </Badge>
            )}
          </span>
        </div>
        <p className="text-lg font-medium truncate">{quiz.title}</p>
        <div className="flex gap-1 items-center">
          <Icons.star className="w-3 h-3 fill-yellow-400" />
          <span className="text-xs">4.5</span>
          <span className="text-xs text-yellow-400">{"(50 vote)"}</span>
        </div>
        <div className="flex gap-1">
          <Badge className="bg-primary/30 hover:bg-primary/30 text-primary gap-0.5">
            <Icons.quizzes className="w-3 h-3 fill-primary" />8 Question
          </Badge>
          <Badge className="bg-destructive/30 hover:bg-destructive/30 text-destructive gap-0.5">
            <Timer className="w-3 h-3 text-destructive" />
            {formatToMinSec(quizTime)}
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Description :</p>
          <p
            className={cn("text-xs text-gray-500 relative", {
              "line-clamp-3": isDescriptionOpen,
            })}
            ref={descriptionRef}
          >
            {quiz.description}
            {isShowMoreVisible && (
              <Button
                className="absolute right-0 bottom-0 rounded-full w-6 h-6 opacity-70 hover:opacity-100"
                size="icon"
                variant="outline"
                onClick={() => setIsDescriptionOpen((prev) => !prev)}
              >
                {!isDescriptionOpen ? (
                  <ArrowUpIcon className="w-3 h-3" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3" />
                )}
              </Button>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Categories :</p>
          <div className="flex gap-1 flex-wrap">
            {quiz.categories.map((category) => (
              <Badge key={category} variant="outline">
                {category.split("_").join(" ").toLocaleLowerCase()}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          <Button className="rounded-full" size="icon" variant="outline">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button className="rounded-full" size="icon" variant="outline">
            <Icons.share className="w-4 h-4 stroke-black fill-black" />
          </Button>
          <Button className="rounded-full" size="icon" variant="outline">
            <Copy className="w-4 h-4" />
          </Button>
          <Button className="flex-1 rounded-full max-w-40">Play</Button>
        </div>
      </div>
    </div>
  );
}
