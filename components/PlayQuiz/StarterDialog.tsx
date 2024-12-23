import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePlayQuizContext } from "./Context";

export default function SaveProgressDialog() {
  const {
    state: { isStarterDialogOpen, currentQuestion },
    dispatch,
    resetQuiz,
  } = usePlayQuizContext();

  const isStarted = isStarterDialogOpen.isStarted || currentQuestion === 0;

  return (
    <Dialog open={isStarterDialogOpen.open}>
      <DialogContent className="sm:max-w-[425px]" hideClose>
        <DialogHeader>
          <DialogTitle className="text-center">
            {!isStarted ? "Back for More?" : "Let's Get Started!"}
          </DialogTitle>
          <DialogDescription>
            {!isStarted
              ? "Ready to challenge yourself? Test your knowledge and see how well you do with the topics ahead. Let's go!"
              : "Ready to test your knowledge? Start from the beginning and see how well you know the topics. Good luck!"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-3">
          {!isStarted && (
            <Button
              type="button"
              onClick={() => {
                dispatch({
                  type: "SET_IS_STARTER_DIALOG_OPEN",
                  payload: { open: false },
                });
                resetQuiz();
              }}
            >
              Start
            </Button>
          )}
          <Button
            type="button"
            onClick={() => {
              dispatch({
                type: "SET_IS_STARTER_DIALOG_OPEN",
                payload: { open: false },
              });
              dispatch({
                type: "SET_QUIZ_MODE",
                payload: "playing",
              });
            }}
          >
            {!isStarted ? "Continue" : "Start "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
