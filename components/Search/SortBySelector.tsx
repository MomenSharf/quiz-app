"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SEARCH_SORT_OPTIONS_WITH_LABEL } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function SortBySelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || undefined);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term && term !== "bestMatch") {
      params.set("sortBy", term);
    } else {
      params.delete("sortBy");
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  useEffect(() => {
    setSortBy(searchParams.get("sortBy") || undefined);
  }, [searchParams]);

  return (
    <Select defaultValue={sortBy || "bestMatch"} onValueChange={handleSearch}>
      <SelectTrigger className="w-[110px] sm:w-[160px]" disabled={isPending}>
        {isPending ? "loading..." : <SelectValue placeholder="Sort by" />}
      </SelectTrigger>
      <SelectContent>
        {[
          { value: "bestMatch", label: "Best match" },
          ...SEARCH_SORT_OPTIONS_WITH_LABEL,
        ].map(({ value, label }) => {
          return (
            <SelectItem value={value} key={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
