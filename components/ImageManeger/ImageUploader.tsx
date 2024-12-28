"use client";

import { useDropzone } from "@uploadthing/react/hooks";
import { useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";
import { toast } from "sonner";

export default function ImageUploader({
  onDropFunction,
}: {
  onDropFunction: (acceptedFiles: File[]) => void;
}) {
  
  const onDrop = onDropFunction;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <>
      <div className="h-[calc(100%_-_2.5rem)]">
        <div
          {...getRootProps()}
          className="flex justify-center items-center cursor-pointer h-[calc(100%_-_2.5rem)] mt-7"
        >
          <input {...getInputProps()} className="cursor-pointer" />

          <div className="w-full h-full flex justify-center items-center flex-col py-5 border-2 border-dashed bg-primary/5 box-content rounded-lg">
            <ImageUp className="w-10 h-10 text-muted-foreground" />
            <h3 className=" flex text-muted-foreground tx-sm">Upload Image</h3>
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
