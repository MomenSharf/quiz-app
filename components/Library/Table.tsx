import { Checkbox } from "../ui/checkbox";
import { useLibraryContext } from "./Context";
import DataCard from "./DataCard";

export default function Table() {
  const {
    dispatch,
    state: { selectedQuizzesIds },
    quizzes,
    folderWithQuizzes,
  } = useLibraryContext();

  return (
    <div className="w-full">
      <table className="w-full table-auto border-separate border-spacing-y-4">
        <thead className="hidden sm:table-header-group">
          <tr className="*:text-start text-sm">
            <th className="w-10 px-2">
              <div className="flex justify-center items-center">
                <Checkbox
                  checked={
                    selectedQuizzesIds.length === quizzes.length &&
                    quizzes.length !== 0
                  }
                  onClick={() => {
                    if (selectedQuizzesIds.length === quizzes.length) {
                      dispatch({
                        type: "SET_SELECTED_QUIZZES_IDS",
                        payload: [],
                      });
                    } else {
                      dispatch({
                        type: "SET_SELECTED_QUIZZES_IDS",
                        payload: quizzes.map((quiz) => quiz.id),
                      });
                    }
                  }}
                  disabled={quizzes.length === 0}
                />
              </div>
            </th>
            <th className="px-3">Name</th>
            <th className="w-40 hidden lg:table-cell px-2">Last Updated</th>
            <th className="w-40 hidden lg:table-cell px-2">Created At</th>
            <th className="w-40 px-2"></th>
            <th className="w-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {folderWithQuizzes.map((folder, i) => {
            return <DataCard key={folder.id} data={folder} index={i} />;
          })}
          {quizzes.map((quiz, i) => {
            // const imageUrl = quiz.imageUrl ? quiz.imageUrl : qui
            return <DataCard key={quiz.id} data={quiz} index={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
