"use client";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function SearchInput() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isSearchOpen ? "250px" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Input
          placeholder="Search"
          className="rounded-tr-none rounded-br-none rounded-tl-full rounded-bl-full border-r-0"
          ref={searchInputRef}
          onBlur={() => {
            setIsSearchOpen(false);
          }}
        />
      </motion.div>
      <Button
        size="icon"
        variant="outline"
        className={cn("rounded-full", {
          "rounded-tl-none rounded-bl-none transition-all": isSearchOpen,
        })}
        onClick={() => {
          if (isSearchOpen) {
          } else {
            setIsSearchOpen(true);
            searchInputRef.current?.focus()
          }
        }}
      >
        <Search className="w-4 h-4 text-gray-medium " />
      </Button>
    </div>
  );
}
