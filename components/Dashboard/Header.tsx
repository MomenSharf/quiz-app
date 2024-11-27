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
        <NewFolderButton className="rounded-xl items-center gap-1 bg-white hover:bg-white hover:scale-[1.02] transition-transform text-foreground text-xs">
          <Icons.folderPlus className="w-4 h-4 fill-gray-extra-dark stroke-transparent " />
          new Folder
        </NewFolderButton>
      </div>
    </div>
  );
}
