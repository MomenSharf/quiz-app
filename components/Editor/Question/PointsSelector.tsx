import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POINTS_OPTIONS } from "@/constants";
import { Bolt } from "lucide-react";
import { useEditorContext } from "../Context";

export default function PointsSelector({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: { setValue, getValues },
  } = useEditorContext();

  const points = getValues(`questions.${questionIndex}.points`);
  return (
    <Select
      defaultValue={points ? points.toString() : (10).toString()}
      onValueChange={(e) =>
        setValue(
          `questions.${questionIndex}.points`,
          Number(e) || POINTS_OPTIONS[0].value
        )
      }
    >
      <SelectTrigger className="w-full ">
        <Bolt className="w-4 h-4" />
        <SelectValue placeholder="Points" />
      </SelectTrigger>
      <SelectContent>
        {POINTS_OPTIONS.map(({label , value}, i) => (
          <SelectItem value={value.toString()} key={i}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
