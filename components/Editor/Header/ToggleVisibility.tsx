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
    state: { saveState },
  } = useEditorContext();
  const currentVisibility = quizSchema.safeParse(getValues()).success
    ? getValues("visibility")
    : "PUBLIC";
  const quizId = getValues("id");

  const handleClick = async () => {
    setLoading(true);

    try {
      const { success, visibility, message } = await toggleVisibility({
        quizId,
        visibility: currentVisibility,
      });

      if (success && visibility) {
        setValue("visibility", visibility);
        toast({ description: message });
      } else {
        toast({ description: message });
      }
    } catch (error) {
      toast({ description: "Error toggling visibility" });
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
          disabled={saveState === "waiting"}
          onClick={() => {
            if (!Object.keys(errors).length) {
              handleClick();
            } else {
              console.log(Object.keys(errors).length);
              toast({
                description: "Please fix the validation errors first.",
                variant: "destructive",
              });
            }
          }}
        >
          {loading ? (
            <Icons.Loader className="w-4 h-4 animate-spin stroke-secondary-foreground" />
          ) : currentVisibility === "PRIVATE" ? (
            <Icons.lock className="w-4 h-4 fill-secondary-foreground" />
          ) : (
            <Icons.global className="w-4 h-4 fill-secondary-foreground" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {currentVisibility === "PRIVATE"
          ? "This content is private and visible only to you."
          : "This content is public and visible to everyone."}{" "}
      </TooltipContent>
    </Tooltip>
  );
}
