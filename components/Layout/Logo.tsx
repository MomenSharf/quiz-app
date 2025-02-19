import React from "react";
import { Icons } from "../icons";

export default function Logo() {
  return (
    <div className="flex items-center sm:justify-end">
      <Icons.circleQ className="w-8 h-8 fill-primary" />
      <div className="hidden sm:flex">
      <span className="text-sm">Uizzes</span>
      <span className="text-xl">Up</span>
      </div>
    </div>
  );
}
