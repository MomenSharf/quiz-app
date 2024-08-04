"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
// import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { Image, ImageUp, Star, Trash } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { convertToAvif } from "@/lib/image";

type FileUploaderProps = {
  setFiles: Dispatch<SetStateAction<Record<number, File>>>;

  files: Record<number, File>;

  image: string | undefined;
  setImage: Dispatch<SetStateAction<string>>;
  index: number;
};

export function FileUploader({
  setFiles,
  files,
  image,
  setImage,
  index,
}: FileUploaderProps) {
  const { startUpload } = useUploadThing("imageUploader");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {



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
    [index, setFiles, setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <>
      <div className="flex flex-col gap-3">
        <div
          {...getRootProps()}
          className="flex flex-col justify-start cursor-pointer overflow-hidden rounded-lg"
        >
          <input {...getInputProps()} className="cursor-pointer" />

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
            <div className="flex justify-center items-center flex-col py-5 border-2 border-dashed bg-[hsl(var(--primary)_/_5%)] box-content">
              <ImageUp className="w-10 h-10 text-muted-foreground" />
              <h3 className=" flex text-muted-foreground tx-sm">
                Image optional
                <Star className=" text-red-500 w-2 h-2 ml-1" />
              </h3>
              <p className="text-xs mb-4 text-muted-foreground">
                SVG, PNG, JPG
              </p>
              <Button type="button" size="sm" className="rounded-full">
                Select from computer
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
