import { MotionDiv } from "@/hooks/useMotion";
import { cn, formatToMinSec } from "@/lib/utils";
import { SearchQuiz } from "@/types";
import { Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";

export default function QuizzesCard({
  quiz,
  index,
}: {
  quiz: SearchQuiz;
  index: number;
}) {
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
      className="min-w-52 bg-card rounded-xl flex flex-col"
    >
      <div className="group relative flex flex-col w-full rounded-xl  rounded-bl-none rounded-br-none overflow-hidden">
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
          className="rounded-xl rounded-bl-none rounded-br-none"
        />
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity w-full h-full flex justify-center items-center bg-black/30">
          <Link
            href={`play/${quiz.id}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "px-10 rounded-full hover:bg-primary hover:scale-[1.05] transition-transform text-lg border-2 border-white"
            )}
          >
            Play
          </Link>
        </div>
      </div>
      <div className="p-2 pb-4 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {/* <UserAvatarImage imageUrl={quiz.user.image} className="w-6 h-6" /> */}
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
              {/* {quiz.user.username} */}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Badge className="bg-primary/30 hover:bg-primary/30 text-primary gap-0.5">
            {quiz.questions.length} Question
          </Badge>
          <Badge className="bg-destructive/30 hover:bg-destructive/30 text-destructive gap-0.5">
            <Timer className="w-3 h-3 text-destructive" />
            {formatToMinSec(quizTime)}
          </Badge>
        </div>
        <div className="flex justify-between gap-1 w-full">
          <div className="flex gap-1 items-center">
            <Icons.star className="w-3 h-3 fill-yellow" />
            <span className="text-xs">4.5</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-xs">10.6k</span>
            <span className="text-xs">plays</span>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
