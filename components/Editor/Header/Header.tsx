import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SaveState from "./SaveState";
import UndoRedo from "./UndoRedo";
import { Icons } from "@/components/icons";
import { useEditorContext } from "../Context";
import { revalidatePathInServer } from "@/lib/actions/utils";
import ToggleVisibility from "./ToggleVisibility";
import { quizSchema } from "@/lib/validations/quizSchemas";

export default function Header() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const {
    dispatch,
    state: { isSettingsOpen },
    form: {
      setFocus,
      control,
      getValues,
      setValue,
      formState: { errors },
    },
  } = useEditorContext();
  const router = useRouter();

  useEffect(() => {
    if (isEditingTitle) {
      setFocus("title");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingTitle]);

  const error = errors.description || errors.imageUrl || errors.categories;
  const quizId = getValues("id");

  return (
    <header className="flex-shrink-0 flex items-center gap-1 md:gap-2 p-2 border-b">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={async () => {
          await revalidatePathInServer("dashbeard");
          router.back();
        }}
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div className="hidden sm:flex">
        <FormField
          control={control}
          name={`title`}
          render={({ field }) => (
            <FormItem>
              <Input
                className={cn("font-semibold w-36", {
                  hidden: !isEditingTitle,
                })}
                {...field}
                onBlur={(e) => {
                  field.onBlur();
                  setIsEditingTitle(false);
                  if (!e.target.value) {
                    setValue("title", "My New Quiz");
                  }
                }}
              />
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          type="button"
          className={cn(
            "w-36 border-transparent justify-start hover:border-input font-semibold hover:bg-card cursor-text",
            {
              hidden: isEditingTitle,
            }
          )}
          onClick={() => setIsEditingTitle(true)}
        >
          <span className="truncate max-w-40">{getValues("title")}</span>
        </Button>
      </div>
      <ToggleVisibility />
      <SaveState />
      <UndoRedo />
      <div className="ml-auto flex gap-2">
        <Button
          variant="outline"
          type="button"
          className={cn("relative gap-1 rounded-xl", {
            "border-primary": isSettingsOpen && !error,
            "border-destructive bg-destructive/10 focus-visible:ring-destructive":
              error,
          })}
          onClick={() => {
            if (!isSettingsOpen)
              dispatch({
                type: "SET_IS_SETTINGS_OPEN",
                payload: true,
              });
          }}
        >
          <Icons.settings
            className={cn("w-4 h-4 fill-gray-medium", {
              "fill-primary": isSettingsOpen && !error,
            })}
          />
          <span
            className={cn("hidden sm:inline-block text-gray-medium", {
              "text-primary": isSettingsOpen && !error,
            })}
          >
            Settings
          </span>
          {error && (
            <Icons.alert className="absolute w-4 h-4 fill-amber stroke-background -top-2 -right-2" />
          )}
        </Button>
        <Button
          type="submit"
          className="gap-1 rounded-xl"
          onClick={() => {
            if (quizSchema.safeParse(getValues()).success)
              ''
              // router.push(`/play/${quizId}?mode=preview`);
          }}
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline-block">Preview</span>
        </Button>
      </div>
    </header>
  );
}
