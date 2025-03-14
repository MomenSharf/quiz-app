import {
  calculateQuizRatings,
  cn,
  formatAsKMB,
  formatToMinSec,
  formatToShortDate,
} from "@/lib/utils";
import { BookmarkQuiz, SearchQuiz, UserProfile } from "@/types";
import { Layers, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";
import BookmarkButton from "./BookmarkButton";
import You from "./You";
import { MotionDiv } from "@/hooks/useMotion";
import { Skeleton } from "../ui/skeleton";
export default function QuizPanelSkeleton() {



  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }} // Ensures it animates only once
    >
      <div className="relative bg-card p-2 flex-1  flex rounded-lg">
        <Skeleton className="w-[112px] h-[84px]" />
        <div className="p-2 flex-1 flex flex-col justify-center gap-2">
          <Skeleton className="h-3 w-full rounded-full" />

          <div className="flex gap-2 text-xs">
            <Skeleton className="h-3 w-16 rounded-xl" />
            <Skeleton className="h-3 w-16 rounded-xl" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-10 rounded-xl" />

            <Skeleton className="h-3 w-10 rounded-xl" />

            <Skeleton className="h-3 w-10 rounded-xl" />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
