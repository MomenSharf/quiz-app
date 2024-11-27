import { Checkbox } from "../ui/checkbox";
import { useDashboardContext } from "./Context";
import DataCard from "./Quiz/DataCard";

export default function Table() {
  const { quizzes, folderWithQuizzes } = useDashboardContext();

  return (
    <div className="w-full">
      <table className="w-full table-auto border-separate border-spacing-y-4">
        <thead className="hidden sm:table-header-group">
          <tr className="*:text-start text-sm">
            <th className="min-w-3 px-2">
              <Checkbox id="terms" />
            </th>
            <th className="w-full px-3">Name</th>
            <th className="w-40 px-2">Last Updated</th>
            <th className="w-40 hidden lg:table-cell px-2">Created At</th>
            <th className="w-40 px-2"></th>
            <th className="w-3 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {folderWithQuizzes.map((folder) => {
            return <DataCard key={folder.id} data={folder} />;
          })}
          {quizzes.map((quiz) => {
            return <DataCard key={quiz.id} data={quiz} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
