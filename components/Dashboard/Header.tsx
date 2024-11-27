import React from "react";
import NewQuizButton from "./Quiz/NewQuizButton";
import NewFolderButton from "./Folder/NewFolderButton";
import { Button } from "../ui/button";
import { Icons } from "../icons";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="sm:text-xl">DASHBOARD</h1>
      <div className="flex gap-1">
        <NewQuizButton />
        <NewFolderButton/>
      </div>
    </div>
  );
}
