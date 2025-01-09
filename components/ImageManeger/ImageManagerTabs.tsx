import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImageUploader";
import { ReactNode } from "react";
import { ImageManagerTabsType } from "@/types";
import { IMAGE_MANAGER_TABS } from "@/constants";

export default function ImageManagerTabs({
  open,
  onOpenChange,
  onDropFunction,
  trigger,
  tabs = ["upload"],
}: {
  open: boolean;
  onOpenChange: (e: boolean) => void;
  onDropFunction: (acceptedFiles: File[]) => void;
  trigger?: ReactNode;
  tabs: ImageManagerTabsType[];
}) {
  function TabsContentSwitcher({ tab }: { tab: ImageManagerTabsType }) {
    switch (tab) {
      case "upload":
        return <ImageUploader onDropFunction={onDropFunction} />;
      case "stockPhotos":
        return `${tab}`;
      case "giphyGIFS":
        return `${tab}`;
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
      <DialogContent className="max-w-3xl flex flex-col px-9 pt-10 pb-0 gap-3">
        <Tabs defaultValue={IMAGE_MANAGER_TABS[0].value} className="h-full">
          <TabsList className="flex">
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
                className="flex items-center justify-center my-3"
                tabIndex={undefined}
              >
                <div className="w-full min-h-96">
                  <TabsContentSwitcher tab={value} />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
