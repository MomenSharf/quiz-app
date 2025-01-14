"use client";

import { useDropzone } from "@uploadthing/react/hooks";
import { useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";
import { toast } from "sonner";

export default function ImageUploader({
  onSelectImage,
}: {
  onSelectImage: (acceptedFiles: File[]  | string ) => void;
}) {

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onSelectImage,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <>
      <div className="flex-1">
        <div
          {...getRootProps()}
          className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg flex justify-center items-center cursor-pointer h-full"
        >
          <input {...getInputProps()} className="cursor-pointer" />

          <div className="w-full h-full flex justify-center items-center flex-col border-2 border-dashed bg-primary/5 box-content rounded-lg">
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
