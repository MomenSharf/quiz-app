import Image from "next/image";
import { useDashboardContext } from "./Context";
import NewFolderButton from "./Folder/NewFolderButton";
import NewQuizButton from "./Quiz/NewQuizButton";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function EmptyDashboard() {
  return (
    <div className="w-full h-full flex flex-col gap-1 justify-center items-center">
      <div className="">
        <Image
          src="/assets/images/Empty-dashboard.png"
          alt="empty gallery"
          width={250}
          height={250}
        />
      </div>
      <h4 className="font-medium">No Quizzes yet</h4>
      <p className="text-muted-foreground">You can create Quizzes her</p>
      <div className="flex gap-3">
        <NewQuizButton />
        <NewFolderButton
          className={cn(
            buttonVariants({ size: "sm" }),
            "rounded-xl items-center gap-1 bg-white hover:bg-white hover:scale-[1.02] transition-transform text-foreground text-xs cursor-pointer"
          )}
        >
          <Icons.folderPlus className="w-4 h-4 fill-gray-extra-dark stroke-transparent " />
          new Folder
        </NewFolderButton>
      </div>
    </div>
  );
}
