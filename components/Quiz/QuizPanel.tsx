import { MotionDiv } from "@/hooks/useMotion";
import { getCurrentUser } from "@/lib/auth";
import {
  calculateQuizRatings,
  cn,
  formatAsKMB,
  formatTimeAgo,
  formatToMinSec,
} from "@/lib/utils";
import { BookmarkQuiz, SearchQuiz, UserProfile } from "@/types";
import { Layers, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import BookmarkButton from "./BookmarkButton";
export default async function QuizPanel({
  quiz,
  index,
}: {
  quiz: SearchQuiz | BookmarkQuiz | UserProfile["quizzes"][number];
  index: number;
}) {
  const sessiom = await getCurrentUser();
  const isCurrentUser = sessiom && quiz.user.id === sessiom.user.id;

  const quizTime = quiz.questions.reduce(
    (acc, curr) => acc + curr.timeLimit,
    0
  );
  const isBookmarked =
    sessiom && sessiom.user.id && quiz.bookmarks
      ? quiz.bookmarks.length > 0
      : false;

  const { averageRating, totalRatings } = calculateQuizRatings(quiz.ratings);

  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.2,
        ease: "easeInOut",
        duration: 0.3,
      }}
      viewport={{ amount: 0 }}
    >
      <div className="relative bg-card p-2 sm:p-3 flex rounded-lg">
        <Link
          href={`quiz/${quiz.id}`}
          className="flex items-center rounded-xl overflow-hidden w-28 min-w-28"
        >
          <Image
            src={quiz.imageUrl || "/assets/images/hero.webp"}
            alt="question Image"
            width={800} // Replace with your desired pixel width
            height={600} // Replace with your desired pixel height
            priority
            style={{
              aspectRatio: "4 / 3", // Maintains the 4:3 aspect ratio
            }}
            className="rounded-xl"
          />
        </Link>

        <div className="p-2 flex flex-col justify-center gap-1.5">
          <div className="flex gap-1">
            <Link
              href={`quiz/${quiz.id}`}
              className={cn(
                "text-sm font-bold max-w-52 sm:max-w-md truncate cursor-pointer hover:text-primary"
              )}
              title={quiz.title}
            >
              {quiz.title}
            </Link>
            {isCurrentUser && (
              <span className="text-primary text-xs">(You)</span>
            )}
          </div>
          <div className="flex gap-1">
            <Badge className="bg-primary/30 hover:bg-primary/30 text-primary gap-0.5">
              <Layers className="w-3 h-3 text-primary" />
              {quiz.questions.length}
            </Badge>
            <Badge className="bg-destructive/30 hover:bg-destructive/30 text-destructive gap-0.5">
              <Timer className="w-3 h-3 text-destructive" />
              {formatToMinSec(quizTime)}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-medium">
              {formatTimeAgo(quiz.createdAt)}
            </span>
            <span> - </span>
            <div className="flex gap-1 items-center">
              <Icons.star className="w-3 h-3 fill-yellow" />
              <span className="text-xs">{averageRating}</span>
              <span className="text-xs">
                ({formatAsKMB(totalRatings)} retings)
              </span>
            </div>
            <span> - </span>
            <div className="flex gap-1 items-center">
              <span className="text-xs">
                {`${formatAsKMB(quiz.playCount)}`} plays
              </span>
            </div>
          </div>
          {!isCurrentUser && (
            <div className="absolute right-3 top-3">
              <BookmarkButton
                quizId={quiz.id}
                pathname="/"
                isBookmarked={isBookmarked}
              />
            </div>
          )}
        </div>
      </div>
    </MotionDiv>
  );
}
