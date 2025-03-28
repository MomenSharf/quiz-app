import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { usePlayQuizContext } from "./Context";
import { rateQuiz as rateQuizServer } from "@/lib/actions/rate";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
export default function RateDialog() {
  const [isRating, setIsRating] = useState(false);
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState<number>(0);
  const [hovered, setHovered] = useState(0);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const session = useSession();
  const { quiz, mode } = usePlayQuizContext();

  useEffect(() => {
    if (mode === "preview") return;
    const userRate =
      (session.data &&
        quiz.ratings.find((e) => e.userId === session.data.user.id)?.rate) ||
      null;

    if (userRate) {
      setRate(userRate);
    } else {
      setTimeout(() => {
        setOpen(true);
      }, 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz, session.data]);

  const rateQuiz = async () => {
    if (rate !== 0) {
      setIsRating(true);
      const { success, message } = await rateQuizServer({
        quizId: quiz.id,
        rate,
      });
      if (!success) {
        setOpen(false);
        toast({ variant: "destructive", description: message });
      } else {
        setOpen(false);
        toast({ description: message });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Please rate the quiz before proceeding!",
      });
    }
    setIsRating(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-20 h-20 sm:w-28 sm:h-28 flex-col gap-1 bg-amber hover:bg-amber/90" disabled={mode === 'preview'}>
          <Icons.star className="w-10 h-10 sm:w-14 sm:h-14 fill-white" />
          <span className="text-xs">Rate</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="*:text-center">
          <DialogTitle>How do you rate this Quiz</DialogTitle>
          <DialogDescription>
            Please rate your experience with this quiz. Your feedback is
            valuable and helps improve future quizzes!
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1 justify-center py-8">
          {[1, 2, 3, 4, 5].map((e) => {
            return (
              <Button
                key={e}
                className="group flex gap-1 items- bg-transparent hover:bg-transparent px-2"
                onClick={() => setRate(e)}
                onMouseEnter={() => {
                  setIsMouseEnter(true);
                  setHovered(e);
                }}
                onMouseLeave={() => {
                  setIsMouseEnter(false);
                  setHovered(0);
                }}
              >
                <Icons.star
                  className={cn("w-10 h-10 fill-gray-light transition-colors", {
                    "fill-amber": isMouseEnter ? e <= hovered : e <= rate,
                  })}
                />
              </Button>
            );
          })}
        </div>
        <div className="flex justify-end gap-3">
          <Button size="sm" onClick={() => setOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button size="sm" className="gap-1" onClick={rateQuiz}>
            {isRating && (
              <Icons.Loader className="w-4 h-4 animate-spin stroke-white" />
            )}
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
