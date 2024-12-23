import { SearchQuiz, SearchQuizWithIsBookmark } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Icons } from "../icons";
import { cn, formatToMinSec } from "@/lib/utils";
import { Copy, Layers, Timer } from "lucide-react";
import { MotionDiv } from "@/hooks/useMotion";
import { getCurrentUser } from "@/lib/auth";
import BookmarkButton from "./BookmarkButton";
export default async function QuizPanel({
  quiz,
  index,
}: {
  quiz: SearchQuizWithIsBookmark;
  index: number;
}) {
  const sesstion = await getCurrentUser();
  const quizTime = quiz.questions.reduce(
    (acc, curr) => acc + curr.timeLimit,
    0
  );
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
          className="flex items-center rounded-xl overflow-hidden w-28"
        >
          <Image
            // src={imageUrl}
            src="/assets/images/hero.webp"
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
          {/* <div className="flex items-center gap-1">
          <UserAvatarImage imageUrl={quiz.user.imageUrl} className="w-6 h-6" />
          <div className="flex flex-col gap-0 w-full">
            <Link
              href={`quiz/${quiz.id}`}
              className={cn(
                "text-sm font-bold max-w-[85%] truncate cursor-pointer hover:text-primary"
              )}
            >
              {quiz.title}
            </Link>
            <p className="text-xs text-gray-medium max-w-[75%] truncate">
              {quiz.user.username}
            </p>
          </div>
        </div> */}
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
            {sesstion?.user.id === quiz.user.id && (
              <Badge className="text-xs">You</Badge>
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
              {formatToMinSec(quiz.createdAt.getTime())}
            </span>
            <span> - </span>
            <div className="flex gap-1 items-center">
              <Icons.star className="w-3 h-3 fill-yellow" />
              <span className="text-xs">4.5</span>
            </div>
            <span> - </span>
            <div className="flex gap-1 items-center">
              <span className="text-xs">10.6k</span>
              <span className="text-xs">plays</span>
            </div>
          </div>
          <div className="absolute right-3 top-3">
            <BookmarkButton
              quizId={quiz.id}
              pathname="/"
              isBookmarked={quiz.isBookmark}
            />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
