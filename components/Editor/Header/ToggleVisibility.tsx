import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useEditorContext } from "../Context";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { toggleVisibility } from "@/lib/actions/editor";
import { quizSchema } from "@/lib/validations/quizSchemas";

export default function ToggleVisibility() {
  const [loading, setLoading] = useState(false);
  const {
    form: {
      getValues,
      setValue,
      formState: { errors },
    },
  } = useEditorContext();
  const visibility = getValues("visibility");
  const quizId = getValues("id");

  const handleClick = async () => {
    setLoading(true);

    try {
      const { success, visibility, message } = await toggleVisibility({
        quizId,
      });

      if (success && visibility) {
        setValue("visibility", visibility);
        toast({ description: message });
      } else {
        toast({ description: message });
      }
    } catch (error) {
      console.error("Error toggling visibility");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full p-1 w-8 h-8"
          type="submit"
          onClick={() => {
            if (!errors) {
              handleClick();
            } else {
              toast({
                description: "Please fix the validation errors first.",
                variant: "destructive",
              });
            }
          }}
        >
          {loading ? (
            <Icons.Loader className="w-4 h-4 animate-spin stroke-secondary-foreground" />
          ) : visibility === "PRIVATE" ? (
            <Icons.lock className="w-4 h-4 fill-secondary-foreground" />
          ) : (
            <Icons.global className="w-4 h-4 fill-secondary-foreground" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {visibility === "PRIVATE"
          ? "This content is private and visible only to you."
          : "This content is public and visible to everyone."}{" "}
      </TooltipContent>
    </Tooltip>
  );
}
