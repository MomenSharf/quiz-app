import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImageUploader";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ImageManagerTabsType } from "@/types";
import { IMAGE_MANAGER_TABS } from "@/constants";
import StockPhotos from "./StockPhotos";
import GiphyGIFS from "./GiphyGIFS";

export default function ImageManagerTabs({
  open,
  onOpenChange,
  onSelectImage,
  trigger,
  tabs = ["upload"],
}: {
  open: boolean;
  onOpenChange: (e: boolean) => void;
  onSelectImage: ({acceptedFiles, from}:{acceptedFiles: File[] | string, from: ImageManagerTabsType}) => void;
  trigger?: ReactNode;
  tabs: ImageManagerTabsType[];
}) {

    const [query, setQuery] = useState("");
  

  function TabsContentSwitcher({ tab, query , setQuery }: { tab: ImageManagerTabsType, query: string, setQuery: Dispatch<SetStateAction<string>>}) {
    switch (tab) {
      case "upload":
        return <ImageUploader onSelectImage={onSelectImage} />;
      case "stockPhotos":
        return <StockPhotos onSelectImage={onSelectImage} query={query} setQuery={setQuery}/>;
      case "giphyGIFS":
        return <GiphyGIFS onSelectImage={onSelectImage} query={query} setQuery={setQuery}/>;
      default:
        return null;
    }
  }

  const TABS = IMAGE_MANAGER_TABS.filter(({ value }) =>
    tabs.includes(value)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl flex flex-col px-3 pt-10 pb-0 gap-3">
        <Tabs defaultValue={IMAGE_MANAGER_TABS[0].value} className="h-full pb-3">
          <TabsList className="flex mb-3">
            {TABS.map(({ label, value }) => {
              return (
                <TabsTrigger value={value} key={value} className={`basis-1/3` } style={{flexBasis: `${100 / (TABS.length)}%`}}>
                  {label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {TABS.map(({ value }) => {
            return (
              <TabsContent
                value={value}
                key={value}
                className="flex items-center justify-center mt-0"
                tabIndex={undefined}
              >
                <div className="w-full min-h-[29rem] flex">
                  <TabsContentSwitcher tab={value} query={query} setQuery={setQuery} />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
