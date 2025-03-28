import { calculateQuizRatings, cn, formatToMinSec } from "@/lib/utils";
import { QuizDetailsWithIsBookmark } from "@/types";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Copy,
  Edit,
  Layers,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BookmarkButton from "../Quiz/BookmarkButton";
import { UserAvatarImage } from "../User/UserAvatar";
import { Icons } from "../icons";
import { Badge, badgeVariants } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "../ui/use-toast";
import DeleteDialog from "./DeleteDiaolg";
import CopyButton from "./CopyButton";
import QuizCardDescription from "./QuizCardDescription";

export default function QuizCard({
  quiz,
  pathname,
  isCurrentUser,
}: {
  quiz: QuizDetailsWithIsBookmark;
  pathname: string;
  isCurrentUser?: boolean;
}) {
  const quizTime = quiz.questions.reduce(
    (acc, curr) => acc + curr.timeLimit,
    0
  );

  const { averageRating, totalRatings } = calculateQuizRatings(quiz.ratings);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center p-5 bg-card rounded-xl">
      <div className="flex flex-col w-full rounded-xl overflow-hidden">
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
          unoptimized

        />
      </div>{" "}
      <div className="lg:col-span-2 flex flex-col gap-3 justify-between">
        <p className="text-lg font-medium truncate">{quiz.title.trim()}</p>
        <div className="flex items-center gap-1">
          <Link href={`/profile/${quiz.user.username}`}>
            <UserAvatarImage user={quiz.user} />
          </Link>
          <Link
            href={`/profile/${quiz.user.username}`}
            className="text-xs text-gray-dark font-medium hover:underline hover hover:text-primary transition-colors"
          >
            {quiz.user.username?.trim()}
            {isCurrentUser && (
              <span className="text-primary text-xs">(You)</span>
            )}
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <Icons.star className="w-3 h-3 fill-yellow" />
          <span className="text-xs">{averageRating}</span>
          <span className="text-xs">({totalRatings} retings) </span>
        </div>
        <div className="flex gap-1">
          <Badge className="bg-primary/30 hover:bg-primary/30 text-primary gap-0.5">
            <Layers className="w-3 h-3 text-primary" />
            {quiz.questions.length} Question
          </Badge>
          <Badge className="bg-destructive/30 hover:bg-destructive/30 text-destructive gap-0.5">
            <Timer className="w-3 h-3 text-destructive" />
            {formatToMinSec(quizTime)}
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Description :</p>
          <QuizCardDescription description={quiz.description.trim() || ""} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Categories :</p>
          <div className="flex gap-1 flex-wrap">
            {quiz.categories.map((category) => (
              <Link
                href={`search`}
                key={category}
                className={cn(badgeVariants({ variant: "outline" }))}
              >
                {category.split("_").join(" ").toLocaleLowerCase()}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          <Link
            href={`/play/${quiz.id}`}
            className={cn(buttonVariants(), "flex-1 rounded-full max-w-40")}
          >
            Play
          </Link>
          {isCurrentUser ? (
            <Link
              href={`/editor/${quiz.id}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group rounded-full flex-1  max-w-40 gap-2"
              )}
            >
              <Edit className="w-4 h-4 " />
              <span>Edit</span>
            </Link>
          ) : (
            <CopyButton quizId={quiz.id} />
          )}

          <Button className="rounded-full" size="icon" variant="outline">
            <Icons.share className="w-4 h-4 stroke-black fill-black" />
          </Button>

          {isCurrentUser ? (
            <DeleteDialog quizId={quiz.id} />
          ) : (
            <BookmarkButton
              quizId={quiz.id}
              pathname={pathname}
              isBookmarked={quiz.isBookmark}
            />
          )}
        </div>
      </div>
    </div>
  );
}
