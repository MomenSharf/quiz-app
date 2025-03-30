import { cn } from "@/lib/utils";
import Link from "next/link";
import UseScrollerContainer from "../Shared/UseScrollerContainer";
import { buttonVariants } from "../ui/button";
import QuizzesCardSkeleton from "./QuizCardSkeleton";

export default function QuizzesCardsScrollerSkeleton({
  title,
  route,
}: {
  title: string;
  route: string;
}) {
  return (
    <div className="flex flex-col gap-1">
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
          <QuizzesCardSkeleton key={i} />
        ))}
      </UseScrollerContainer>
    </div>
  );
}
