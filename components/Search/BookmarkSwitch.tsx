"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "../ui/switch";

export default function BookmarkSwitch({ isBookmarked }: { isBookmarked: boolean }) {
  const [checked, setChecked] = useState(isBookmarked);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckedChange = (isChecked: boolean) => {
    console.log(isChecked);

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

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold">Bookmarks</span>
      <Switch checked={checked} onCheckedChange={handleCheckedChange} />
    </div>
  );
}
