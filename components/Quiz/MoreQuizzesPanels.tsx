"use client";
import { Category, SearchQuiz, SearchSortOption } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import QuizzesPanelsTable from "../Quiz/QuizzesPanelsTable";
import { useInView } from "framer-motion";
import { getSearchQuizzes } from "@/lib/actions/search";
import { toast } from "../ui/use-toast";
import { Icons } from "../icons";
import QuizzesPanelsTableSkeleton from "./QuizzesPanelsTableSkeleton";

export default function MoreQuizzesPanels({
  query,
  category,
  sortOption,
  isBookmarked,
}: {
  query: string | undefined;
  category: Category | undefined;
  sortOption?: SearchSortOption;
  isBookmarked: boolean;
}) {
  const [quizzes, setQuizzes] = useState<SearchQuiz[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref);

  const fetchQizzes = useCallback(
    async (searchQuery: string, currentPage: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const { success, message, quizzes } = await getSearchQuizzes({
          query: searchQuery || "wanderlust",
          page: currentPage,
          category,
          sortOption,
          isBookmarked,
        });

        if (success && quizzes) {
          setQuizzes((prev) => [...prev, ...quizzes]);
          setHasMore(quizzes.length > 0); // Assume 12 is the page size
        } else {
          toast({ description: message, variant: "destructive" });
        }
      } catch (error) {
        toast({
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  useEffect(() => {
    if (inView && hasMore && !loading && query && query.trim()) {
      fetchQizzes(query, page + 1);
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading, query, page, fetchQizzes]);

  return (
    <div className="flex flex-col gap-3">
      <QuizzesPanelsTable quizzes={quizzes} />
      {loading && <QuizzesPanelsTableSkeleton />}
      <div ref={ref} className="w-full h-1" />
    </div>
  );
}
