import { MotionDiv } from "@/hooks/useMotion";
import { getCurrentUser } from "@/lib/auth";
import {
  calculateQuizRatings,
  cn,
  formatAsKMB,
  formatTimeAgo,
  formatToMinSec,
  formatToShortDate,
} from "@/lib/utils";
import { BookmarkQuiz, SearchQuiz, UserProfile } from "@/types";
import { Layers, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import BookmarkButton from "./BookmarkButton";
import You from "./You";
export default function QuizPanel({
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
  const isBookmarked = quiz.bookmarks && quiz.bookmarks.length > 0;

  const { averageRating } = calculateQuizRatings(quiz.ratings);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }} // Ensures it animates only once
    >
      <div className="relative bg-card p-2  flex rounded-lg">
        <Link
          href={`quiz/${quiz.id}`}
          className="flex items-center rounded-xl overflow-hidden w-28 min-w-28"
        >
          <Image
            src={quiz.imageUrl || "/assets/images/hero.webp"}
            // src="/assets/images/categories/ART.jpg"
            // src="/assets/images/categories/ART.jpg"
            alt="question Image"
            width={800} // Replace with your desired pixel width
            height={600} // Replace with your desired pixel height
            priority
            style={{
              aspectRatio: "4 / 3", // Maintains the 4:3 aspect ratio
            }}
            className="rounded-xl"
            unoptimized
          />
        </Link>

        <div className="p-2 flex flex-col justify-center gap-1.5">
          <div className="flex gap-1">
            <Link
              href={`quiz/${quiz.id}`}
              className={cn(
                "text-sm font-bold max-w-36 sm:max-w-80 md:max-w-md truncate cursor-pointer hover:text-primary"
              )}
              title={quiz.title}
            >
              {quiz.title}
            </Link>
            <You userId={quiz.userId} />
          </div>
          <div className="flex gap-2 text-xs">
            <div className="flex gap-1">
              <Layers className="w-3 h-3" />
              {quiz.questions.length}
            </div>
            <div className="flex text-xs gap-1">
              <Timer className="w-3 h-3" />
              {formatToMinSec(quizTime)}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-medium">
              {formatToShortDate(quiz.createdAt)}
            </span>
            <span> - </span>
            <div className="flex gap-1 items-center">
              <Icons.star className="w-3 h-3 fill-yellow" />
              <span className="text-xs">{averageRating}</span>
            </div>
            <span> - </span>
            <div className="flex gap-1 items-center">
              <span className="text-xs">
                {`${formatAsKMB(quiz.playCount)}`} plays
              </span>
            </div>
          </div>
          <div className="absolute right-3 top-3">
            <BookmarkButton
              quizId={quiz.id}
              pathname="/"
              isBookmarked={isBookmarked}
            />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
