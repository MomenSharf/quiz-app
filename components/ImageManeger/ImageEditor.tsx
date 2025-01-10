import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import "cropperjs/dist/cropper.css";
import {
  FlipHorizontal2,
  FlipVertical2,
  ImageOff,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { createRef, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ClientUploadedFileData } from "uploadthing/types";

export default function ImageEditor({
  open,
  onOpenChange,
  files,
  afterUpload,
  aspectRatio,
}: {
  open: boolean;
  onOpenChange: (e: boolean) => void;
  files: File[] | string | null;
  afterUpload: (uploadedImage: ClientUploadedFileData<null>[]) => void;
  aspectRatio: number;
}) {
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const cropperRef = createRef<ReactCropperElement>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFile = (files: File[]) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };

    reader.readAsDataURL(files[0]);
  };

  useEffect(() => {
    if (files)
      if (Array.isArray(files)) {
        handleFile(files);
      } else if (typeof files === "string") {
        setImage(files); // Directly set the image URL if files is a string
      }
  }, [files]);

  const handleZoomIn = () => {
    if (!cropperRef.current) return;
    const cropper = cropperRef.current.cropper;
    cropper.zoom(0.1); // Zoom in by 10%
  };

  const handleZoomOut = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    cropper.zoom(-0.1); // Zoom out by 10%
  };

  const handleFlipH = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const scaleX = cropper.getData().scaleX || 1;
    cropper.scaleX(-scaleX); // Flip horizontally
  };

  const handleFlipV = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const scaleY = cropper.getData().scaleY || 1;
    cropper.scaleY(-scaleY); // Flip vertically
  };

  const handleRotateLeft = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    cropper.rotate(-90); // Rotate left by 90 degrees
  };

  const handleRotateRight = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    cropper.rotate(90); // Rotate right by 90 degrees
  };
  const handleReset = () => {
    if (!cropperRef.current) return;
    const cropper = cropperRef.current.cropper;
    cropper.reset(); // Reset the cropper to its initial state
  };

  const imageDropQuality = async () => {
    if (files) {
      if (Array.isArray(files) && files[0]) {
        if (files[0].size > 1000000) {
          return 0.3;
        } else if (files[0].size > 500000) {
          return 0.5;
        } else {
          return 0.7;
        }
      } else if (typeof files === "string") {
        return 0.7; // Default quality for URLs
      }
    }
    return 0.3; // Default quality if no files
  };

  const { startUpload } = useUploadThing("imageUploader");

  const getCropData = async () => {
    if (files) {
      if (!cropperRef.current) return;

      cropperRef.current.cropper.getCroppedCanvas().toBlob(
        async (blob) => {
          if (!blob) return;

          const file = new File([blob], "cropped-image.webp", {
            type: "image/webp",
          });

          try {
            setIsUploading(true);
            const uploadedImage = await startUpload([file]);
            if (uploadedImage && uploadedImage.length > 0) {
              afterUpload(uploadedImage);
              toast("image uploaded successfully");
            } else {
              toast("something wrong with apluading img");
            }
          } catch (error) {
            toast("something wrong with apluading img");
          } finally {
            setIsUploading(false);
          }
        },
        "image/webp",
        imageDropQuality
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="" side="bottom">
        <p className="font-semibold">Edit</p>
        {files ? (
          // || url ?
          <div className="flex flex-col gap-3 w-full items-center">
            <div className="" ref={containerRef}>
              <Cropper
                ref={cropperRef}
                style={{
                  height: "400px",
                  width: "100%",
                }}
                initialAspectRatio={1}
                aspectRatio={aspectRatio}
                preview=".img-preview"
                src={image}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={true}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-1">
              <div className="flex justify-center items-center pt-2">
                <Button size="icon" variant="ghost" onClick={handleZoomIn}>
                  <ZoomIn className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleZoomOut}>
                  <ZoomOut className="w-5 h-5" />
                </Button>
                <Separator orientation="vertical" className="mx-1" />
                <Button size="icon" variant="ghost" onClick={handleRotateLeft}>
                  <RotateCcw className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleRotateRight}>
                  <RotateCw className="w-5 h-5" />
                </Button>
                <Separator orientation="vertical" className="mx-1" />
                <Button size="icon" variant="ghost" onClick={handleFlipV}>
                  <FlipVertical2 className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleFlipH}>
                  <FlipHorizontal2 className="w-5 h-5" />
                </Button>
                <Separator
                  orientation="vertical"
                  className="mx-1 hidden sm:block"
                />
              </div>
              <div className="flex justify-center gap-3">
                <Button variant="ghost" onClick={handleReset}>
                  Reset
                </Button>
                <Separator orientation="vertical" className="mx-1" />
                <Button onClick={getCropData}>Save</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-32 flex flex-col gap-2 justify-center items-center">
            <ImageOff className="w-16 h-16 text-muted-foreground" />
            <span className="font-semibold text-lg">No image</span>
          </div>
        )}
        {isUploading && (
          <div className="absolute flex flex-col left-0 top-0 w-full h-full bg-card/50 z-10 justify-center items-center">
            <span className="loader" />
            <span className="font-semibold mt-5">Uploading...</span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
