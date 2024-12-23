import React from "react";
import { Icons } from "../icons";

export default function Logo() {
  return (
    <div className="flex items-end">
      <Icons.circleQ className="w-8 h-8 fill-primary" />
      <span className="text-sm sm:text-base hidden sm:inline-block">Uizzes</span>
      <span className="text-xl sm:text-2xl font-bold hidden sm:inline-block">Up</span>
    </div>
  );
}
