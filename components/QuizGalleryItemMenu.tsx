import {
  CircleArrowDown,
  Cloud,
  Copy,
  CreditCard,
  EllipsisVertical,
  ExternalLink,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PenLine,
  Play,
  Plus,
  PlusCircle,
  RotateCcw,
  Settings,
  Share,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Quiz } from "@prisma/client";
import DeleteQuizButton from "./DeleteQuizButton";
import QuizGalleryItemDrawer from "./QuizGalleryItemDrawer";

type QuizGalleryItemMenuProps = {
  trigger: JSX.Element;
  contentPostionClasses: string;
  quiz: Pick<Quiz, "id" | "title">;
};

export default function QuizGalleryItemMenu({
  trigger,
  contentPostionClasses,
  quiz,
}: QuizGalleryItemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          contentPostionClasses,
          "relative w-40 text-muted-foreground"
        )}
      >
        <DropdownMenuLabel>{quiz.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-primary hover:text-primary flex gap-2">
            <Play className="w-5 h-5 fill-primary" />
            <span className="font-semibold">Preview</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2">
            <PenLine className="w-5 h-5" />
            <span className="font-semibold">Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2">
            <ExternalLink className="w-5 h-5" />
            <span className="font-semibold">Shere</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" flex gap-2">
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">Reset</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2">
            <Copy className="w-5 h-5" />
            <span className="font-semibold">Duplicate</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0 transition-all">
            <DeleteQuizButton
              variant="ghost"
              text="Delete"
              pathname="/my-quizzes"
              quizzesIds={[quiz.id]}
              className="flex gap-1 w-full text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
