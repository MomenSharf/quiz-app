"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "../ui/switch";
import Loader from "../Layout/Loader";
import { Icons } from "../icons";

export default function BookmarkSwitch({
  isBookmarked,
}: {
  isBookmarked: boolean;
}) {
  const [checked, setChecked] = useState(isBookmarked);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setChecked(searchParams.get("isBookmarked") === "true");
  }, [searchParams]);

  const handleCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);

    // Get the current query parameters
    const params = new URLSearchParams(searchParams);

    if (isChecked) {
      // Add 'showAnswers' to the URL query
      params.set("isBookmarked", "true");
    } else {
      // Remove 'showAnswers' from the URL query
      params.delete("isBookmarked");
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex items-center gap-2 mr-auto">
      <span className="text-sm font-semibold">Bookmarks</span>
      <Switch checked={checked} onCheckedChange={handleCheckedChange}  disabled={isPending}/>
      {isPending && <Icons.Loader className="w-5 h-5 animate-spin stroke-muted-foreground" />}
    </div>
  );
}
