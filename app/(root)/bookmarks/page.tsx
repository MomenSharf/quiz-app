import { Icons } from "@/components/icons";
import ErrorPage from "@/components/Layout/ErrorPage";
import QuizzesPanelsTable from "@/components/Quiz/QuizzesPanelsTable";
import CategorySelector from "@/components/Search/CategorySelector";
import SortBySelector from "@/components/Search/SortBySelector";
import { getBookmarksQuizzes } from "@/lib/actions/bookmark";
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
  const category = isValidCategoryOption(searchParams?.category)
    ? searchParams?.category
    : undefined;

  const { success, message, quizzes } = await getBookmarksQuizzes({
    query,
    sortOption,
    category,
  });

  if (!success || !quizzes) {
    return <ErrorPage message={message} />;
  }
  return (
    <div className="flex flex-col h-full gap-3 p-2 sm:p-3">
      <h1 className="text-thin text-lg">BOOKMARKS</h1>
      <div className="flex justify-end gap-1 sm:gap-3">
        <SortBySelector />
        <CategorySelector />
      </div>
      <div className="h-full">
        {quizzes.length > 0 ? (
          <QuizzesPanelsTable quizzes={quizzes} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-3 justify-center items-center">
              <Icons.bookmarkOff className="w-16 h-16 sm:w-20 sm:h-20 fill-muted-foreground" />
              <p className="text-sm sm:text-base text-gray-medium">
                No bookmarked quizzes found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
