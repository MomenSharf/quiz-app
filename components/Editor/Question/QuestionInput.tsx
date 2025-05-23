import { Icons } from "@/components/icons";
import ImageManagerTabs from "@/components/ImageManeger/ImageManagerTabs";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEditorContext } from "../Context";

export default function QuestionInput({
  questionIndex,
  isImageManagerTabs,
  setIsImageManagerTabs,
}: {
  questionIndex: number;
  isImageManagerTabs: boolean;
  setIsImageManagerTabs: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    dispatch,
    form: { control, getValues, getFieldState, setValue },
  } = useEditorContext();

  const hasImageUrl =
    getValues(`questions.${questionIndex}.imageUrl`) !== undefined;
  const type =
    getValues(`questions.${questionIndex}.type`) !== undefined;

  
  return (
    <FormField
      control={control}
      name={`questions.${questionIndex}.question`}
      render={({ field }) => (
        <FormItem className="space-y-1 flex w-full flex-col relative">
          <FormLabel className="text-inherit">Question</FormLabel>
          <FormControl className="bg-card rounded-md">
            <div className="flex">
              <Textarea
                className={cn(
                  "resize-none font-bold focus:z-10 text-md min-h-20 h-16",
                  {
                    "rounded-tr-none rounded-br-none": !hasImageUrl,
                  },
                  {
                    "border-destructive bg-destructive/10 focus-visible:ring-destructive ":
                      getFieldState(`questions.${questionIndex}.question`)
                        .error,
                  }
                )}
                placeholder="Type your Question..."
                maxLength={300}
                {...field}
                value={getValues(`questions.${questionIndex}.question`)}
              />
              <ImageManagerTabs
                tabs={["upload", "stockPhotos", "giphyGIFS"]}
                onSelectImage={({ acceptedFiles, from }) => {
                  setIsImageManagerTabs(false);
                  if (
                    from === "giphyGIFS" &&
                    typeof acceptedFiles === "string"
                  ) {
                    setValue(`questions.${questionIndex}.imageUrl`, acceptedFiles);
                  } else {
                    dispatch({
                      type: "SET_IS_IMAGE_EDITOR_OPEN",
                      payload: {
                        isOpen: true,
                        files: acceptedFiles,
                        field: `questions.${questionIndex}.imageUrl`,
                      },
                    });
                  }
                }}
                open={isImageManagerTabs}
                onOpenChange={setIsImageManagerTabs}
                trigger={
                  hasImageUrl ? undefined : (
                    <Button
                      variant="outline"
                      className="h-full border-l-0 rounded-tl-none rounded-bl-none"
                    >
                      <Icons.picture className="w-5 h-5 fill-black" />
                    </Button>
                  )
                }
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
