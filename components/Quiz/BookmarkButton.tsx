'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { Bookmark } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { toggleBookmark } from '@/lib/actions/bookmark';
import { cn } from '@/lib/utils';

export default function BookmarkButton({quizId, pathname, isBookmarked}: {quizId: string, pathname: string, isBookmarked?: boolean}) {
    const [isBookmarkingQuiz, setIsBookmarkingQuiz] = useState(false);
    const bookmarkQuiz = async () => {
      setIsBookmarkingQuiz(true);
      const { success, message } = await toggleBookmark({
        quizId,
        pathname,
      });
      if (!success) {
        {
          setIsBookmarkingQuiz(false);
          toast({ variant: "destructive", description: message });
        }
      } else {
        setIsBookmarkingQuiz(false);
        toast({ description: message });
      }
    };
  return (
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
  )
}
