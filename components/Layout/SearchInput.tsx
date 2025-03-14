"use client";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchInput() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputContainerRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(searchInputContainerRef, () => {
    if (!searchParams.get("query") && searchParams.get("query") !== "")
      setIsSearchOpen(false);
  });

  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (pathname === "/search") {
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (searchParams.has("query")) {
      setIsSearchOpen(true);
    }
  }, [searchParams]);

  const handleSearchWidthDebounce = useDebouncedCallback(handleSearch, 500);

  return (
    <div
      className="flex items-center ml-auto sm:ml-0"
      ref={searchInputContainerRef}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isSearchOpen ? "auto" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Input
          placeholder="Search"
          className={cn(
            "rounded-tr-none rounded-br-none rounded-tl-full rounded-bl-full h-8 border-r-0 focus-visible:ring-transparent textt-xs",
            { "w-8 rounded-full": !isSearchOpen }
          )}
          ref={searchInputRef}
          onChange={(e) => {
            handleSearchWidthDebounce(e.target.value.trim());
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (
                isSearchOpen &&
                searchInputRef &&
                searchInputRef.current?.value !== "" &&
                pathname !== "/search" &&
                pathname !== "/bookmarks"
              ) {
                push(`/search?query=${e.currentTarget?.value}`);
              }
            }
          }}
          defaultValue={searchParams.get("query") || ""}
        />
      </motion.div>
      <Button
        size="icon"
        variant="outline"
        className={cn("rounded-full w-8 h-8", {
          "rounded-tl-none rounded-bl-none transition-all": isSearchOpen,
        })}
        aria-label="Search"
        onClick={() => {
          if (isSearchOpen && pathname !== "/search") {
            if (searchInputRef && searchInputRef.current?.value !== "") {
              push(`/search?query=${searchInputRef.current?.value}`);
            } else {
              setIsSearchOpen(false);
            }
          } else {
            setIsSearchOpen(true);
            searchInputRef.current?.focus();
          }
        }}
      >
        <Search className="w-4 h-4 text-gray-medium" />
      </Button>
    </div>
  );
}
