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
import { HTMLProps, useState } from "react";
import { useLibraryContext } from "../Context";
import { deleteFolder } from "@/lib/actions/library";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Layout/Loader";

type DeleteQuizButtonProps = HTMLProps<HTMLDivElement> & {
  pathname: string;
  folderId: string;
};

export default function DeleteFolderButton({
  folderId,
  open,
  setOpen,
}: {
  folderId: string;
  open: boolean;
  setOpen: (e: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            disabled={loading}
            onClick={async () => {
              setLoading(true);

              const { success, message } = await deleteFolder({
                folderId,
                pathname: "library",
              });

              if (success) {
                toast({ description: "folder deleted successfully" });
              } else {
                toast({
                  description: message,
                  title: "error",
                  variant: "destructive",
                });
              }

              setLoading(false);
              setLoading(true);
            }}
            className="flex gap-1 items-center"
          >
            {loading ? <Loader /> : <Trash2 className="w-4 h-4" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
