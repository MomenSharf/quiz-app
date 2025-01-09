import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useEditorContext } from "../Context";

export default function QuestionImage({
  field,
  imageUrl,
  openImageManagerTabs,
}: {
  field: "imageUrl" | `questions.${number}.imageUrl`;
  imageUrl: string;
  openImageManagerTabs: () => void;
}) {
  
  const {
    dispatch,
    form: { setValue },
  } = useEditorContext();
  return (
    <div className="flex flex-col gap-3 p-3 bg-card rounded h-fit">
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          size="icon"
          variant="destructive"
          className="w-8 h-8"
          onClick={() => {
            setValue(field, undefined);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="w-8 h-8"
          onClick={() => {
            dispatch({
              type: "SET_IS_IMAGE_EDITOR_OPEN",
              payload: {
                isOpen: true,
                files: imageUrl,
                field,
              },
            });
          }}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          className="h-8 text-xs"
          onClick={openImageManagerTabs}
        >
          Replace
        </Button>
      </div>
      <div className="flex flex-col w-full rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt="question Image"
          width={800} // Replace with your desired pixel width
          height={600} // Replace with your desired pixel height
          priority
          style={{
            aspectRatio: "4 / 3", // Maintains the 4:3 aspect ratio
          }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
