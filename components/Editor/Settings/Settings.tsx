"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import ImageManagerTabs from "@/components/ImageManeger/ImageManagerTabs";
import { useEditorContext } from "../Context";
import CategoriesSelector from "./CategoriesSelector";
import { useState } from "react";
import { Icons } from "@/components/icons";
import QuestionImage from "../Question/QuestionImage";
import ErrorSpan from "../Question/QuestionForms/QuestionFormsElements/ErrorSpan";
import { cn } from "@/lib/utils";

export default function Settings({ type }: { type: "settings" | "publish" }) {
  const [isImageManagerTabs, setIsImageManagerTabs] = useState(false);

  const {
    dispatch,
    form: {
      control,
      getValues,
      formState: { errors },
    },
  } = useEditorContext();

  const imageUrl = getValues("imageUrl");

  return (
    <div className="container max-w-3xl py-3 flex flex-col gap-3">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1 flex w-full flex-col">
            <FormLabel className="text-inherit">Descrption</FormLabel>
            <FormControl>
              <div className="bg-white rounded-tl-md rounded-bl-md">
                <Textarea
                  placeholder="type descrption for your quiz..."
                  className={cn(
                    "h-full max-h-72 w-full resize-none transition-all",
                    {
                      "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                        errors.description,
                    }
                  )}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-1">
        <h4>Thumbnail image</h4>
        <>
          <ImageManagerTabs
            onDropFunction={(acceptedFiles) => {
              setIsImageManagerTabs(false);
              dispatch({
                type: "SET_IS_IMAGE_EDITOR_OPEN",
                payload: {
                  isOpen: true,
                  files: acceptedFiles,
                  field: `imageUrl`,
                },
              });
            }}
            open={isImageManagerTabs}
            onOpenChange={setIsImageManagerTabs}
            trigger={
              !imageUrl && (
                <Button className="self-start gap-1">
                  <Icons.picture className="w-5 h-5 fill-primary-foreground" />
                  Add Image
                </Button>
              )
            }
          />
          <QuestionImage
            imageUrl={imageUrl}
            openImageManagerTabs={() => {
              console.log(10);

              setIsImageManagerTabs(true);
            }}
            field="imageUrl"
          />

          {errors && <ErrorSpan error={errors.imageUrl} />}
        </>
      </div>

      <CategoriesSelector />
    </div>
  );
}
