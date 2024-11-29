import {
  PenLine,
  Trash2,
  X
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { DashboardFoldersWithQuiz } from "@/types";
import { HTMLProps } from "react";
import DeleteFolderButton from "./DeleteFolderButton";
import RenameFolder from "./RenameFolder";

type QuizMenuProps = HTMLProps<HTMLDivElement> & {
  pathname: string;
  folder: DashboardFoldersWithQuiz;
};

export default function FolderDrawer({
  children,
  pathname,
  folder,
  ...props
}: QuizMenuProps) {



  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div {...props}>{children}</div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex justify-end px-3">
          <DrawerClose className="" asChild>
            <Button variant="outline" className="p-1" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </DrawerClose>
        </div>
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle>{folder.title}</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col w-full px-1">
           
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
            >
              <RenameFolder folderId={folder.id} className="w-full flex gap-2">
                <PenLine className="w-6 h-6" />
                <span className="font-semibold">Rename</span>
              </RenameFolder>
            </Button>

 
          </div>
          <DrawerFooter className="p-1">
            <DeleteFolderButton
              pathname={pathname}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-2 justify-start text-lg w-full text-destructive hover:text-white hover:bg-destructive"
              )}
              folderId={folder.id}
            >
              <Trash2 className="w-6 h-6" />
              Delete
            </DeleteFolderButton>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
