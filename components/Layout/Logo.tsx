import React from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return <Icons.circleQ className={cn("w-7 h-7 fill-primary", className)} />;
}
