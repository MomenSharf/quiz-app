import React from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { LoaderCircle, LucideProps } from "lucide-react";

export default function Loader({
  className,
  strokeWidth
}: LucideProps) {
  return (
    <LoaderCircle
      className={cn("w-4 h-4 animate-spin", className)}
      strokeWidth={strokeWidth}
    />
  );
}
