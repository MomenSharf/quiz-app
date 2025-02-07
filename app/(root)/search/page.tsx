import ErrorPage from "@/components/Layout/ErrorPage";
import QuizzesPanelsTable from "@/components/Quiz/QuizzesPanelsTable";
import CategorySelector from "@/components/Search/CategorySelector";
import MoreSearchQuizzes from "@/components/Search/MoreSearchQuizzes";
import SortBySelector from "@/components/Search/SortBySelector";
import { getSearchQuizzes } from "@/lib/actions/search";
import { isValidCategoryOption, isValidSearchSortOption } from "@/lib/utils";
import Image from "next/image";

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

  const { success, message, quizzes } = await getSearchQuizzes({
    query,
    sortOption,
    category,
  });

  if (!success || !quizzes) {
    return <ErrorPage message={message} />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 p-2 sm:p-3">
      {query && (
        <h1 className="font-semibold max-w-full truncate">
          Showing results for {`'${query}'`}
        </h1>
      )}
      <div className="flex justify-end gap-1 sm:gap-3">
        <SortBySelector />
        <CategorySelector />
      </div>
      <div className="w-full h-full">
        {quizzes.length > 0 ? (
          <div className="flex flex-col gap-1 sm:gap-3">
          <QuizzesPanelsTable quizzes={quizzes} />
          <MoreSearchQuizzes query={query} category={category} sortOption={sortOption} />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Image
              src="/assets/images/no-results.png "
              alt="no result"
              width={100}
              height={100}
            />
            <p className="font-bold text-lg mt-2">No Quizzes found</p>
            <p className="text-sm text-gray-medium truncate max-w-full">for {`'${query}'`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
