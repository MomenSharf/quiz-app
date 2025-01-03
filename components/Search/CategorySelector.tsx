"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_OPTIONS_LIST, SEARCH_SORT_OPTIONS_WITH_LABEL } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategorySelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const category = searchParams.get("category") || "";

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select defaultValue={category} onValueChange={handleSearch}>
      <SelectTrigger className="w-[130px] sm:w-[160px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORY_OPTIONS_LIST.map(({ value, label }) => {
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
