import React from "react";
import { useEditorContext } from "../../EditorContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUESTION_TYPES_WITH_LABEL_AND_ICONS } from "@/constants";
import { cn } from "@/lib/utils";
import { QuestionType } from "@prisma/client";

export default function TypeSelector({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    form: {
      setValue,
      formState: { errors },
      trigger,
      getValues,
    },
  } = useEditorContext();

  const type = getValues(`questions.${questionIndex}.type`);
  return (
    <Select 
    defaultValue={type}
    onValueChange={async (value) => {
      const selectedType = value as QuestionType
      if (value !== type)
        setValue(`questions.${questionIndex}.type`, selectedType);
      if (errors.questions) {
        await trigger();
      }
    }}>
      <SelectTrigger className="w-full" >
        <SelectValue placeholder="Questio Type" />
      </SelectTrigger>
      <SelectContent>
        {QUESTION_TYPES_WITH_LABEL_AND_ICONS.map(
          ({ value, label, icon: Icon }) => {
            return (
              <SelectItem value={value} key={value}>
                <div className="flex gap-1 items-center">
                  <Icon
                    key={label}
                    className={cn(
                      "w-6 h-6 fill-muted-foreground text-muted-foreground",
                      {
                        "text-primary fill-primary": type === value,
                      }
                    )}
                  />
                  <span
                    className={cn({
                      "text-foreground": type === value,
                    })}
                  >
                    {label}
                  </span>
                </div>
              </SelectItem>
            );
          }
        )}
      </SelectContent>
    </Select>
  );
}
