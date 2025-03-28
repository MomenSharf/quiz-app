import ErrorPage from "@/components/Layout/ErrorPage";
import QuizzesPanelsContainer from "@/components/Quiz/QuizzesPanelsContainer";
import QuizzesPanelsTable from "@/components/Quiz/QuizzesPanelsTable";
import BookmarkSwitch from "@/components/Search/BookmarkSwitch";
import CategorySelector from "@/components/Search/CategorySelector";
import MoreSearchQuizzes from "@/components/Search/MoreSearchQuizzes";
import SortBySelector from "@/components/Search/SortBySelector";
import { getSearchQuizzes } from "@/lib/actions/search";
import { getCurrentUser } from "@/lib/auth";
import { isValidCategoryOption, isValidSearchSortOption } from "@/lib/utils";
import { SearchQuiz } from "@/types";
import Image from "next/image";
import fakeSearchQuizzes from "@/fake-data/search-quizzes.json";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    sortBy?: string;
    category?: string;
    isBookmarked?: string;
    userId?: string;
    page?: string;
  }>;
}) {
  const session = await getCurrentUser();

  const searchParams = await props.searchParams;
  const userId = searchParams?.userId;
  const query = searchParams?.query;
  const sortOption = isValidSearchSortOption(searchParams?.sortBy)
    ? searchParams?.sortBy
    : undefined;
  const category = isValidCategoryOption(searchParams?.category)
    ? searchParams?.category
    : undefined;
  const page = searchParams?.page;
  const isBookmarked = searchParams?.isBookmarked === "true";

  let searchQuizzes: SearchQuiz[] = [];

  const { success, message, quizzes } = await getSearchQuizzes({
    query,
    sortOption,
    category,
    isBookmarked,
  });

  if (
    (!success || !quizzes) &&
    process.env.NEXT_PUBLIC_USE_FAKE_DATA !== "true"
  ) {
    return <ErrorPage message={message} />;
  }

  if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true") {
    searchQuizzes = fakeSearchQuizzes as unknown as SearchQuiz[];
  } else {
    searchQuizzes = quizzes ? quizzes : [];
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 p-2 sm:p-3">
      {query && (
        <h1 className="font-semibold max-w-full truncate">
          Showing results for {`'${query}'`}
        </h1>
      )}
      <div className="flex gap-3 justify-end sm:gap-3">
        {session && page !== "bookmarks" && (
          <BookmarkSwitch isBookmarked={isBookmarked} />
        )}
        <div className="flex gap-1">
          <SortBySelector />
          <CategorySelector />
        </div>
      </div>
      <div className="w-full h-full">
        {searchQuizzes && searchQuizzes.length > 0 ? (
          <QuizzesPanelsContainer
            quizzes={searchQuizzes}
            query={query}
            category={category}
            sortOption={sortOption}
            isBookmarked={isBookmarked}
            userId={userId}
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Image
              src="/assets/images/no-results.png"
              alt="no result"
              width={100}
              height={100}
            />
            <p className="font-bold text-lg mt-2">
              {page === "bookmarks"
                ? "No quizzes bookmarked"
                : "No Quizzes found"}
            </p>
            {query && (
              <p className="text-sm text-gray-medium truncate max-w-full">
                for {`'${query}'`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
