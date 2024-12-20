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

  const isStarted = isStarterDialogOpen.isStarted || currentQuestion === 0

  return (
    <Dialog open={isStarterDialogOpen.open}>
      <DialogContent className="sm:max-w-[425px]" hideClose>
        <DialogHeader>
          <DialogTitle className="text-center">
            {!isStarted
              ? "Start from beginning or continue?"
              : "Are You ready ?"}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="py-5 sm:justify-center">
          <div className="flex gap-3">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
