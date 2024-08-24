
import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { QuestionTypesWithLabelAndIcons } from "@/constants";
import { Badge } from "../ui/badge";
import EditorSidebarItemMenu from "./EditorSidebarItemMenu";
import { Icons } from "../icons";
import { Ellipsis } from "lucide-react";

interface EditorSidebarItemProps {
  question: questionSchemaType;
  index: number;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditorSidebarItem({
  question,
  index,
  currentQuestion,
  setCurrentQuestion,
}: EditorSidebarItemProps) {
  const y = useMotionValue(0);
  const Icon = QuestionTypesWithLabelAndIcons.find(
    (e) => e.value === question.type
  )?.icon;

  return (
    <Reorder.Item value={question} id={question.id} style={{ y }}>
      <div
        key={question.id}
        className={cn(buttonVariants({size: "icon", variant:"outline"}),"py-10 w-full min-w-20 min-h-20 relative hover:border-ring hover:bg-background", {
          "border-ring bg-accent hover:bg-accent": currentQuestion === index,
        })}
        onClick={() => setCurrentQuestion(index)}
      >
        {Icon && (
          <Icon
            className={cn("w-7 h-7 text-muted-foreground fill-muted-foreground", {
              "text-primary fill-primary": currentQuestion === index,
            })}
          />
        )}
        <span className="absolute top-1 left-1 text-muted-foreground text-xs">
          {question.questionOrder + 1}
        </span>
        {/* <Badge className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1 right-1"></Badge> */}
        <div className=" absolute top-1 right-1">
          <EditorSidebarItemMenu
            trigger={
              <Button className="group px-1.5 py-0.5 h-auto rounded-full hover:bg-primary" size='sm' variant='ghost'>
                <Ellipsis className="w-3 h-3 text-muted-foreground group-hover:text-primary-foreground" />
              </Button>
            }
            contentPostionClasses="sm:left-20"
            index={index}
          />
        </div>
      </div>
    </Reorder.Item>
  );
}