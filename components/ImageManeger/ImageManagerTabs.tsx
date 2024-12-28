import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImageUploader";
import { ReactNode } from "react";

type QuestionImageManagerTabs = {};

export default function ImageManagerTabs({
  open,
  onOpenChange,
  onDropFunction,
  trigger,
}: {
  open: boolean;
  onOpenChange: (e: boolean) => void;
  onDropFunction: (acceptedFiles: File[]) => void;
  trigger?: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl h-[85vh] flex flex-col px-8">
        <Tabs defaultValue="upload" className="h-full">
          <TabsList className="flex">
            <TabsTrigger value="upload" className="basis-1/3">
              Upload
            </TabsTrigger>
            <TabsTrigger value="stock-photos" className="basis-1/3">
              Stock photos
            </TabsTrigger>
            <TabsTrigger value="giphy-GIFS" className="basis-1/3">
              giphy GIFS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="h-full">
            <ImageUploader onDropFunction={onDropFunction} />
          </TabsContent>
          <TabsContent
            value="stock-photos"
            className="w-full h-[calc(100%_-_2rem)] max-h-full"
          >
            {/* <StockPhotos /> */}
          </TabsContent>
          <TabsContent
            value="giphy-GIFS"
            className="w-full h-[calc(100%_-_2rem)] max-h-full"
          >
            {/* <GiphyGIFs /> */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
