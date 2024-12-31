import { PenLine, Trash2, X } from "lucide-react";

import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
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
import { HTMLProps, useState } from "react";
import DeleteFolderButton from "./DeleteFolderButton";
import RenameFolder from "./RenameFolder";

type QuizMenuProps = ButtonProps & {
  pathname: string;
  folder: DashboardFoldersWithQuiz;
};

export default function FolderDrawer({
  children,
  pathname,
  folder,
  ...props
}: QuizMenuProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button {...props}>{children}</Button>
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
                onClick={() => {
                  setOpen(false);
                  setRenameDialogOpen(true);
                }}
              >
                <PenLine className="w-6 h-6" />
                <span className="font-semibold">Rename</span>
              </Button>
            </div>
            <DrawerFooter className="p-1">
              <Button
                className="gap-2 justify-start text-lg w-full"
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="w-6 h-6" />
                Delete
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <DeleteFolderButton
        folderId={folder.id}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
      <RenameFolder
        folderId={folder.id}
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
      />
    </>
  );
}
