import { getCurrentUser } from "@/lib/auth";
import {
  calculateQuizRatings,
  cn,
  formatAsKMB,
  formatToMinSec,
} from "@/lib/utils";
import { BookmarkQuiz, SearchQuiz, UserProfile } from "@/types";
import { Layers, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { UserAvatarImage } from "../User/UserAvatar";
import You from "./You";
import { MotionDiv } from "@/hooks/useMotion";
import { Skeleton } from "../ui/skeleton";

export default function QuizCard({
  quiz,
  index,
}: {
  quiz: SearchQuiz | BookmarkQuiz | UserProfile["quizzes"][number];
  index: number;
}) {
  const quizTime = quiz.questions.reduce(
    (acc, curr) => acc + curr.timeLimit,
    0
  );

  const { averageRating } = calculateQuizRatings(quiz.ratings);
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }} // Ensures it animates only once
      className="min-w-44 w-44 sm:min-w-52 sm:w-52 bg-card rounded-xl flex flex-col"
    >
      <Link href={`quiz/${quiz.id}`}>
        <div className="group relative flex flex-col w-full rounded-xl  rounded-bl-none rounded-br-none overflow-hidden">
          <Image
            src={quiz.imageUrl || "/assets/images/hero.webp"}
            alt="question Image"
            width={800} // Replace with your desired pixel width
            height={600} // Replace with your desired pixel height
            priority
            style={{
              aspectRatio: "4 / 3", // Maintains the 4:3 aspect ratio
            }}
            className="rounded-xl rounded-bl-none rounded-br-none z-[2]"
            unoptimized
          />
          <Skeleton className="absolute h-[132px] sm:h-[156px] w-full" />
        </div>
      </Link>
      <div className="p-2 pb-4 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <Link href={`/profile/${quiz.user.username}`}>
            <UserAvatarImage user={quiz.user} className="w-8 h-8 text-xs" />
          </Link>
          <div className="flex flex-col gap-0 w-full">
            <Link
              href={`quiz/${quiz.id}`}
              className={cn(
                "text-sm font-bold max-w-[80%] truncate cursor-pointer hover:text-primary"
              )}
            >
              {quiz.title}
            </Link>
            <div className="flex gap-1">
              <Link
                href={`/profile/${quiz.user.username}`}
                className="text-xs text-gray-dark font-medium hover:underline hover hover:text-primary transition-colors"
              >
                {quiz.user.username}
              </Link>
              <You userId={quiz.userId} />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-1">
          <div className="flex gap-1 text-xs">
            <Layers className="w-3 h-3" />
            {quiz.questions.length}
          </div>
          <div className="flex text-xs gap-1">
            <Timer className="w-3 h-3" />
            {formatToMinSec(quizTime)}
          </div>
        </div>
        <div className="flex justify-between gap-1 w-full">
          <div className="flex gap-1 items-center">
            <Icons.star className="w-3 h-3 fill-yellow" />
            <span className="text-xs">{averageRating}</span>
          </div>
          <span className="text-xs">
            {`${formatAsKMB(quiz.playCount)}`} plays
          </span>
        </div>
      </div>
    </MotionDiv>
  );
}
