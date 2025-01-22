'use client'
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export default function QuizCardDescription({
  description,
}: {
  description: string;
}) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!descriptionRef.current) return;
    const lineHeight = parseFloat(
      getComputedStyle(descriptionRef.current).lineHeight
    );
    const contentHeight = descriptionRef.current.scrollHeight;
    if (contentHeight > lineHeight * 3) {
      setIsShowMoreVisible(true);
    }
  }, []);

  return (
    <p
      className={cn("text-xs text-gray-medium relative", {
        "line-clamp-3": isDescriptionOpen,
      })}
      ref={descriptionRef}
    >
      {description}
      {isShowMoreVisible && (
        <Button
          className="absolute right-0 bottom-1 rounded-full w-6 h-6 opacity-70 hover:opacity-100"
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
  );
}
