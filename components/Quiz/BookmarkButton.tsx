"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Bookmark } from "lucide-react";
import { toast } from "../ui/use-toast";
import { toggleBookmark } from "@/lib/actions/bookmark";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function BookmarkButton({
  quizId,
  pathname,
  isBookmarked: isB,
}: {
  quizId: string;
  pathname: string;
  isBookmarked?: boolean;
}) {
  const session = useSession();

  const [isBookmarkingQuiz, setIsBookmarkingQuiz] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(isB);
  if (!session) return null;
  const bookmarkQuiz = async () => {
    setIsBookmarked(prev => !prev);
    setIsBookmarkingQuiz(true);
    const { success, message,bookmarked } = await toggleBookmark({
      quizId,
      pathname,
    });
    if (!success) {
      {
        setIsBookmarkingQuiz(false);
        setIsBookmarked(isB);
        toast({ variant: "destructive", description: message });
      }
    } else {
      setIsBookmarkingQuiz(false);
      toast({ description: message });
    }
  };
  return (
    <>
      {session.data?.user && (
        <Button
          className="rounded-full"
          size="icon"
          variant="outline"
          disabled={isBookmarkingQuiz}
          onClick={bookmarkQuiz}
        >
          {isBookmarkingQuiz ? (
            <Icons.Loader className="w-4 h-4 animate-spin stroke-foreground" />
          ) : (
            <Bookmark
              className={cn("w-4 h-4", {
                "fill-amber text-amber": isBookmarked,
              })}
            />
          )}
        </Button>
      )}
    </>
  );
}
