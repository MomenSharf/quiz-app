"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

type OptionProps = {
  field: ControllerRenderProps<
    {
      text: string;
      options: {
        text: string;
        isCorrect: boolean;
      }[];
      ImageUrl?: string | undefined;
    },
    "options"
  >;
  index: number;
  errors:
    | Merge<
        FieldError,
        (
          | Merge<
              FieldError,
              FieldErrorsImpl<{
                text: string;
                isCorrect: boolean;
              }>
            >
          | undefined
        )[]
      >
    | undefined;
};

export default function Option2({ field, index, errors }: OptionProps) {

  const [isEditing, setIsEditing] = useState(!(field.value[index].text.length > 0));
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    optionRef.current?.querySelector("textarea")?.focus();
  }, [isEditing]);


  return (
    <div>
      <div
        className={cn("flex flex-col gap-1 items-center", {
          hidden: !isEditing,
        })}
        ref={optionRef}
      >
        <Textarea
          className={cn(
            "resize-y text-xl min-h-14 max-h-28 h-14 font-semibold border-2",
            {
              "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                errors && errors[index] ? true : false,
            }
          )}
          placeholder="Correct Option..."
          onChange={(e) => {
            const newOptions = field.value;
            if (newOptions.length - 1 < index) {
              newOptions.push({
                isCorrect: false,
                text: e.target.value,
              });
            } else {
              newOptions[index] = {
                ...newOptions[index],
                text: e.target.value,
              };
            }
            field.onChange(newOptions);
          }}
          value={field.value[index].text}
          onBlur={(e) => {
            field.onBlur();
            // console.log(field.value);
            
            if (field.value[index].text.length > 0) {
              setIsEditing(false);
            }
          }}
          ref={field.ref}
          name={field.name}
          disabled={field.disabled}
        />
        {errors && errors[index] &&<p className="text-destructive text-xs font-light mt-1 self-start">{errors[index].text?.message}</p>}
      </div>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "flex gap-3 w-full text-xl font-semibold justify-start border-2 py-7",
          {
            hidden: isEditing,
          }
        )}
        onClick={() => {
          setIsEditing(true);
        }}
      >
        {field.value[index].text}
      </Button>
    </div>
  );
}
