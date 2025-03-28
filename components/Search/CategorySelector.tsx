"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_OPTIONS_LIST } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function CategorySelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const [category, setCategory] = useState(
    searchParams.get("category") || undefined
  );

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term && term !== "allCategories") {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  useEffect(() => {
    setCategory(searchParams.get("category") || undefined);
  }, [searchParams]);

  return (
    <Select
      defaultValue={category || "allCategories"}
      onValueChange={handleSearch}
    >
      <SelectTrigger className="w-[110px] sm:w-[160px]" disabled={isPending}>
        {isPending ? "loading..." : <SelectValue placeholder="Category" />}
      </SelectTrigger>
      <SelectContent>
        {[
          { value: "allCategories", label: "All Categories" },
          ...CATEGORY_OPTIONS_LIST,
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
