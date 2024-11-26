import Image from "next/image";
import { useDashboardContext } from "./Context";
import NewFolderButton from "./Folder/NewFolderButton";
import NewQuizButton from "./Quiz/NewQuizButton";

export default function EmptyDashboard() {
  const {
    state: { isCreatingQuiz },
    createQuiz,
  } = useDashboardContext();

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
        <NewFolderButton />
      </div>
    </div>
  );
}
