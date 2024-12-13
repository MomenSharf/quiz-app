import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import TypeSelector from "./TypeSelector";
import { questionSchemaType } from "@/lib/validations/quizSchemas";
import TimelimitSelector from "./TimelimitSelector";
import PointsSelector from "./PointsSelector";
import SelectorMenu from "./SelectorMenu";

export default function Header({ questionIndex }: { questionIndex: number }) {
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);
  return (
    <div className="bg-white relative flex gap-3 p-2"
>
      {/* <div
        className={cn(
          "flex gap-3 p-2",
          {
            'hidden': !isHeaderOpen
          }
        )}
      > */}
        <div className="block sm:hidden">
          <SelectorMenu questionIndex={questionIndex} />
        </div>
        <div className="w-full">
          <TypeSelector questionIndex={questionIndex} />
        </div>
        <div className="hidden sm:flex gap-3 w-full">
          <TimelimitSelector questionIndex={questionIndex} />
          <PointsSelector questionIndex={questionIndex} />
        </div>
      {/* </div> */}
      {/* <Button
        size="icon"
        variant="outline"
        className="absolute w-10 h-5 sm:w-14 sm:h-5 bg-white hover:bg-white border-0 rounded-tl-none rounded-tr-none  -bottom-5 right-3 rounded-bl-md rounded-br-md"
        onClick={() => setIsHeaderOpen((prev) => !prev)}
      >
        {isHeaderOpen ? (
          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
        ) : (
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
        )}
      </Button> */}
    </div>
  );
}
