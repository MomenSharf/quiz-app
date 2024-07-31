import * as React from "react";
import {
  Copy,
  ExternalLink,
  Minus,
  PenLine,
  Play,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Quiz } from "@prisma/client";
import DeleteQuizButton from "./DeleteQuizButton";
import { Separator } from "./ui/separator";

type QuizGalleryItemDrawerProps = {
  trigger: JSX.Element;
  quiz: Pick<Quiz, "id" | "title">;
};

export default function QuizGalleryItemDrawer({
  quiz,
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
            <DrawerTitle>{quiz.title}</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>

          <div className="flex flex-col w-full px-1">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary flex gap-2 px-3 py-4 w-full justify-start text-lg border-b"
            >
              <Play className="w-6 h-6 fill-primary" />
              <span className="font-semibold">Preview</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg border-b"
            >
              <PenLine className="w-6 h-6" />
              <span className="font-semibold">Rename</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg border-b"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="font-semibold">Shere</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg border-b"
            >
              <RotateCcw className="w-6 h-6" />
              <span className="font-semibold">Reset</span>
            </Button>
            <Button
              variant="ghost"
              className="flex gap-2 px-3 py-4 w-full justify-start text-lg"
            >
              <Copy className="w-6 h-6" />
              <span className="font-semibold">Duplicate</span>
            </Button>
          </div>
          <DrawerFooter>
            <DeleteQuizButton
              quizzesIds={[quiz.id]}
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
