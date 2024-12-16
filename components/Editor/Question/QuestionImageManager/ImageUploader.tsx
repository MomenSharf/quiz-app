"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { ImageUp, Star } from "lucide-react";
import { toast } from "sonner";
import { useEditorContext } from "../../Context";

type FileUploaderProps = {
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;

  files: Record<number, File>;

  image: string | undefined;
  setImage: Dispatch<SetStateAction<string>>;
  index: number;
};

export default function ImageUploader({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    dispatch,
  } = useEditorContext();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size > 2000000) {
        return toast("Maximam 2MB size");
      }
      dispatch({type: 'SET_IS_QUESTIONS_IMAGE_MANAGER_OPEN', payload: false})
      dispatch({
        type: "SET_IS_IMAGE_EDITOR_OPEN",
        payload: {
          isOpen: true,
          files: acceptedFiles,
        },
      });
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <>
      <div className="h-[calc(100%_-_2.5rem)]">
        <div
          {...getRootProps()}
          className="flex justify-center items-center cursor-pointer overflow- h-[calc(100%_-_2.5rem)] mt-7"
        >
          <input {...getInputProps()} className="cursor-pointer" />

          <div className="w-full h-full flex justify-center items-center flex-col py-5 border-2 border-dashed bg-primary/5 box-content rounded-lg">
            <ImageUp className="w-10 h-10 text-muted-foreground" />
            <h3 className=" flex text-muted-foreground tx-sm">
              Upload Image
            </h3>
            <p className="text-xs mb-4 text-muted-foreground">SVG, PNG, JPG</p>
            <Button type="button" size="sm" className="rounded-full">
              Select from computer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
