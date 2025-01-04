import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
export default function ErrorPage({
  title = "An error happens",
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <h1 className="text-5xl font-bold text-blue-extra-dark flex items-center">
          <Icons.alert className="w-12 h-12 fill-destructive" /> Error!
        </h1>
        <h2 className="text-lg text-blue-extra-dark font-bold">{title}</h2>
        {message && <p className="text-xs sm:text-sm text-gray-dark">{message}</p>}
        <Link className={cn(buttonVariants(), "rounded-full")} href="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
