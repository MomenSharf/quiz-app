"use client";
import { copyQuiz as copyQuizServer } from "@/lib/actions/quizDetails";
import { cn, formatToMinSec } from "@/lib/utils";
import { QuizDetailsWithIsBookmark } from "@/types";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Copy,
  Edit,
  Layers,
  Timer,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BookmarkButton from "../Quiz/BookmarkButton";
import { UserAvatarImage } from "../User/UserAvatar";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import DeleteDialog from "./DeleteDiaolg";
import QuizImage from "./QuizImage";

export default function QuizCard({
  quiz,
  pathname,
}: {
  quiz: QuizDetailsWithIsBookmark;
  pathname: string;
}) {
  const sessiom = useSession();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);
  const [isCopyingQuiz, setIsCopiyngQuiz] = useState(false);
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

  const copyQuiz = async () => {
    setIsCopiyngQuiz(true);
    const { success, message, newQuiz } = await copyQuizServer(quiz.id);
    if (!success || !newQuiz) {
      setIsCopiyngQuiz(false);
      toast({ variant: "destructive", description: message });
    } else {
      setIsCopiyngQuiz(false);
      toast({ description: message });
      router.push(`/editor/${newQuiz.id}`);
    }
  };

  const router = useRouter();

  const isOner = quiz.user.id === sessiom.data?.user.id;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center p-5 bg-card rounded-xl">
      <QuizImage imageUrl="" />
      <div className="lg:col-span-2 flex flex-col gap-2 justify-between">
        <div className="flex items-center gap-1">
          <UserAvatarImage imageUrl={""} className="w-10 h-10" />
          <span className="text-xs text-gray-dark font-medium">
            {quiz.user.username?.trim()}{" "}
            {isOner && <Badge className="font-thin">You</Badge>}
          </span>
        </div>
        <p className="text-lg font-medium truncate">{quiz.title.trim()}</p>
        <div className="flex gap-1 items-center">
          <Icons.star className="w-3 h-3 fill-yellow" />
          <span className="text-xs">4.5</span>
          <span className="text-xs text-yellow-400">{"(50 vote)"}</span>
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
          <p
            className={cn("text-xs text-gray-medium relative", {
              "line-clamp-3": isDescriptionOpen,
            })}
            ref={descriptionRef}
          >
            {quiz.description.trim()}
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
          <Button
            className="flex-1 rounded-full max-w-40"
            onClick={() => router.push(`/play/${quiz.id}`)}
          >
            Play
          </Button>
          {isOner ? (
            <Button
              className="group rounded-full flex-1  max-w-40 gap-2"
              variant="outline"
              onClick={() => router.push(`/editor/${quiz.id}`)}
            >
              <Edit className="w-4 h-4 " />
              <span>Edit</span>
            </Button>
          ) : (
            <Button
              className="rounded-full"
              size="icon"
              variant="outline"
              onClick={copyQuiz}
              disabled={isCopyingQuiz}
            >
              {isCopyingQuiz ? (
                <Icons.Loader className="w-4 h-4 animate-spin stroke-foreground" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          )}

          <Button className="rounded-full" size="icon" variant="outline">
            <Icons.share className="w-4 h-4 stroke-black fill-black" />
          </Button>

          {isOner ? (
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
