import QuizzesPanelsTable from "@/components/Quiz/QuizzesPanelsTable";
import CategorySelector from "@/components/Search/CategorySelector";
import SortBySelector from "@/components/Search/SortBySelector";
import { getSearchQuizzes } from "@/lib/actions/search";
import { isValidCategoryOption, isValidSearchSortOption } from "@/lib/utils";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    sortBy?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const sortOption = isValidSearchSortOption(searchParams?.sortBy)
    ? searchParams?.sortBy
    : undefined;
  const category = isValidCategoryOption(searchParams?.category) ? searchParams?.category : undefined;

  const { success, message, quizzes } = await getSearchQuizzes({
    query,
    sortOption,
    category,
  });

  if (!success || !quizzes) {
    return <p>{message}</p>;
  }
  return (
    <div className="flex flex-col gap-3 p-2 sm:p-3">
      <h1 className="font-semibold max-w-full truncate">
        Showing results for {`'${query}'`}
      </h1>
      <div className="flex justify-end gap-1 sm:gap-3">
        <SortBySelector />
        <CategorySelector />
      </div>
      <div>
        {quizzes.length > 0 ? (
          <QuizzesPanelsTable quizzes={quizzes} />
        ) : (
          <p className="font-bold text-lg">No quizzes found.</p>
        )}
      </div>
    </div>
  );
}
