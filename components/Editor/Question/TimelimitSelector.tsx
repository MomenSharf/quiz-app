import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIMELIMIT_OPTIONS } from "@/constants";
import { Timer } from "lucide-react";
import { useEditorContext } from "../Context";

export default function TimelimitSelector({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { setValue, getValues },
  } = useEditorContext();

  const timeLimit = getValues(`questions.${questionIndex}.timeLimit`);
  
  

  return (
    <Select
      defaultValue={timeLimit ? timeLimit.toString() : TIMELIMIT_OPTIONS[0].value.toString()}
      onValueChange={(e) =>
        setValue(
          `questions.${questionIndex}.timeLimit`,
          Number(e)
        )
      }
    >
      <SelectTrigger className="">
        <Timer className="w-4 h-4" />
        <SelectValue placeholder="Timer" />
      </SelectTrigger>
      <SelectContent>
        {TIMELIMIT_OPTIONS.map((option, i) => (
          <SelectItem value={option.value.toString()} key={i}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
