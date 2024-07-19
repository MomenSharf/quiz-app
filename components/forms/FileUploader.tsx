"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
// import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { toast } from "../ui/use-toast";
import { Trash } from "lucide-react";

type FileUploaderProps = {
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;

  files: Record<number, File>;

  image: string | undefined;
  setImage: Dispatch<SetStateAction<string>>;
  index: number;
};
let gg = 1;

export function FileUploader({
  setFiles,
  files,
  image,
  setImage,
  index,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);

      if (acceptedFiles[0].size > 2000000) {
        return toast({
          title: "File too large",
          description: "Please upload a file smaller than 2MB.",
          variant: "destructive",
        });
      }

      setFiles((prevFiles) => ({
        ...prevFiles,
        [index]: acceptedFiles[0],
      }));
      setImage(convertFileToUrl(acceptedFiles[0]));
    },
    [setFiles, setImage, index]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-start cursor-pointer overflow-hidden rounded-lg bg-grey-50"
    >
      <input
        {...getInputProps()}
        className="cursor-pointer focus:border-primary"
      />

      {image ? (
        <div className="relative">
          <div className="flex w-full flex-1 justify-center items-center relative border">
            <img
              src={image}
              alt="image"
              className="w-full object-center rounded-lg overflow-hidden"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-2 z-10"
              
              onClick={() => {
                setImage("");
                setFiles((prev) => {
                  delete prev[index];
                  return prev;
                });
              }}
            >
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
          {/* <div className='absolute left-1/2 -top-1/2 -translate-x-1/2 -translate-y-1/2'> replec</div> */}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col py-5 border">
          <Image
            src="/images/upload.svg"
            width={50}
            height={50}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2 text-muted-foreground">Drag photo here</h3>
          <p className="p-medium-12 mb-4 text-muted-foreground">
            SVG, PNG, JPG
          </p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
