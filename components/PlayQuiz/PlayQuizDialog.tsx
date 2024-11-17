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

export default function PlayQuizDialog() {
  const {
    state: { isStarterDialogOpen },
    dispatch,
  } = usePlayQuizContext();

  return (
    <Dialog open={isStarterDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Are You ready ?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="py-5 sm:justify-center">
          <Button
            type="button"
            onClick={() => {
              dispatch({ type: "SET_IS_STARTER_DIALOG_OPEN", payload: false });
              dispatch({
                type: "SET_QUIZ_MODE",
                payload: 'playing',
              });
            }}
          >
            Start
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
