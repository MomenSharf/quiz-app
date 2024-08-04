import {
  PenLine,
  X
} from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Quiz } from "@prisma/client";
import DeleteFolderButton from "./DeleteFolderButton";

type QuizGalleryItemDrawerProps = {
  trigger: JSX.Element;
  folder: Pick<Quiz, "id" | "title">;
};

export default function QuizGalleryFolderDrawer({
  folder,
  trigger,
}: QuizGalleryItemDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="flex justify-end px-3">
          <DrawerClose className="" asChild>
            <Button variant="outline" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </DrawerClose>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{folder.title}</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col w-full px-1">

            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg border-b"
            >
              <PenLine className="w-6 h-6" />
              <span className="font-semibold">Rename</span>
            </Button>
           
          </div>
          <DrawerFooter>
            <DeleteFolderButton
              folderId={folder.id}
              title={folder.title}
              pathname="pathname"
              text="Delete"
              className="flex gap-2 text-lg"
              variant="destructive"
              iconclassName="w-6 h-6"
              size='lg'
            />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
