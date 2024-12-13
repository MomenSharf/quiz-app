import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorContext } from "../EditorContext";
import ImageUploader from "./ImageUploader";
import StockPhotos from "./StockPhotos";
import GiphyGIFs from "./GiphyGIFs";
import { Heart, Paperclip } from "lucide-react";

type QuestionImageManagerTabs = {
  trigger: JSX.Element;
};

export default function QuestionImageManagerTabs({
  trigger,
}: QuestionImageManagerTabs) {
  const {
    dispatch,
    state: { isQuestionImageManagerTabsOpen },
  } = useEditorContext();

  return (
    <Dialog
      open={isQuestionImageManagerTabsOpen}
      onOpenChange={(e) =>
        dispatch({
          type: "SET_IS_QUESTION_IMAGE_MANAGER_TABS_OPEN",
          payload: e,
        })
      }
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl h-[85vh] flex flex-col">
        <Tabs defaultValue="upload" className="h-full">
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="stock-photos">Stock photos</TabsTrigger>
            <TabsTrigger value="giphy-GIFS">giphy GIFS</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="h-full">
            <ImageUploader />
          </TabsContent>
          <TabsContent
            value="stock-photos"
            className="w-full h-[calc(100%_-_2rem)] max-h-full"
          >
            <StockPhotos />
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
