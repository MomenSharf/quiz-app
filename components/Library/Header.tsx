import React from "react";
import NewQuizButton from "./Quiz/NewQuizButton";
import NewFolderButton from "./Folder/NewFolderButton";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export default function Header({title ,folderId} : {title: string ;folderId?: string}) {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="sm:text-xl">{title}</h1>
      <div className="flex gap-1">
        <NewQuizButton folderId={folderId}/>
        <NewFolderButton
          className={cn(
            buttonVariants({ size: "sm" }),
            "rounded-xl items-center gap-1 bg-white hover:bg-white hover:scale-[1.02] transition-transform text-foreground text-xs cursor-pointer"
          )}
          parentId={folderId}
        >
          <Icons.folderPlus className="w-4 h-4 fill-gray-extra-dark stroke-transparent " />
          new Folder
        </NewFolderButton>
      </div>
    </div>
  );
}
