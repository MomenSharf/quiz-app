import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { quizSchema } from "@/lib/validations/quizSchemas";
import { useEditorContext } from "../Context";

export default function ToggleVisibility() {
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
    : "PRIVATE";

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
              setValue(
                "visibility",
                currentVisibility === "PRIVATE" ? "PUBLIC" : "PRIVATE"
              );
            } else {
              toast({
                description: "Please fix the validation errors first.",
                variant: "destructive",
              });
            }
          }}
        >
          {currentVisibility === "PRIVATE" ? (
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
