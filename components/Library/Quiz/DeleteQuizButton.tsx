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
import { deleteQuizzes } from "@/lib/actions/library";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Layout/Loader";

type DeleteQuizButtonProps = HTMLProps<HTMLDivElement> & {
  pathname: string;
  ids: string[];
};

export default function DeleteQuizButton({
  ids,
  open,
  setOpen,
}: {
  ids: string[];
  open: boolean;
  setOpen: (e: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const { dispatch, quizzes } = useLibraryContext();
  const title =
    ids.length === 1
      ? quizzes.find((quiz) => quiz.id === ids[0])?.title
      : ids.length > 1
      ? quizzes
          .filter((quiz) => ids.includes(quiz.id))
          .map((quiz) => quiz.title)
      : "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-center w-full">
            Delete confirmation
          </DialogTitle>
          <DialogDescription>
            {typeof title === "string" ? (
              <div className="flex flex-col items-center sm:items-start gap-1">
                <p>Are you sure you want to delete the quiz :</p>
                <p className="truncate max-w-[200px] text-center">- {title}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="text-center">
                  Are you sure you want to delete {title?.length} quizzes :
                </p>
                <ul className="px-10 sm:px-14 w-full max-h-[60vh] overflow-y-scroll">
                  {title?.map((title, i) => {
                    return (
                      <li key={i} className="truncate max-w-[250px] text-start">
                        {i + 1} - {title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </DialogDescription>{" "}
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
              const { success, message } = await deleteQuizzes({
                quizzesIds: ids,
                pathname: "libraty",
              });

              if (success) {
                toast({
                  description: `${
                    ids.length === 1 ? "Quiz" : "Quizzes"
                  } deleted successfully`,
                });
              } else {
                toast({
                  description: message,
                  title: "error",
                  variant: "destructive",
                });
              }
              setOpen(false);
              setLoading(false);
              dispatch({ type: "SET_SELECTED_QUIZZES_IDS", payload: [] });
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
