import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { HTMLProps } from "react";
import { useDashboardContext } from "../Context";

type DeleteQuizButtonProps = HTMLProps<HTMLDivElement>  & {
  pathname: string;
  folderId: string;
};

export default function DeleteFolderButton({
  children,
  pathname,
  folderId,
  ...props
}: DeleteQuizButtonProps) {
  const {
    state: {  isDeletingFolder },
    deleteFolder,
  } = useDashboardContext();


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div {...props}>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Delete confirmation</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isDeletingFolder}
            onClick={() => {
              deleteFolder({pathname, folderId});
            }}
            className="flex gap-1 items-center"
          >
            {isDeletingFolder ? (
              <Icons.Loader className="w-4 h-4 animate-spin stroke-primary-foreground" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
