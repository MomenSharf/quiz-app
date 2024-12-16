import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploader from "./ImageUploader";
import { useEditorContext } from "../../Context";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

type QuestionImageManagerTabs = {};

export default function QuestionImageManagerTabs({
  questionIndex,
}: {
  questionIndex: number;
}) {
  const {
    dispatch,
    state: { isQuestionImageManagerTabsOpen },
  } = useEditorContext();

  return (
    <Dialog
      open={isQuestionImageManagerTabsOpen}
      onOpenChange={(e) =>
        dispatch({
          type: "SET_IS_QUESTIONS_IMAGE_MANAGER_OPEN",
          payload: e,
        })
      }
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-tl-none rounded-bl-none border-l-0 h-full"
        >
          <Icons.picture className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[85git vh] flex flex-col px-8">
        <Tabs defaultValue="upload" className="h-full">
          <TabsList className="flex">
            <TabsTrigger value="upload" className="basis-1/3">Upload</TabsTrigger>
            <TabsTrigger value="stock-photos" className="basis-1/3">Stock photos</TabsTrigger>
            <TabsTrigger value="giphy-GIFS" className="basis-1/3">giphy GIFS</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="h-full">
            <ImageUploader questionIndex={questionIndex} />
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
