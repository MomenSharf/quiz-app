import Cards from "@/components/Home/Cards";
import CategoriesScroller from "@/components/Home/CategoriesScroller";
import Header from "@/components/Layout/Header";
import QuizzesCardsScroller from "@/components/Quiz/QuizzesCardsScroller";
import { getSearchQuizzes } from "@/lib/actions/search";
import { db } from "@/lib/db";

export default async function Home() {
  const {quizzes} = await getSearchQuizzes({ query: 'q'});

  return (
    <div className="flex flex-col">
      <div className="container p-2 sm:p-4 mt-1 sm:mt-3 mb-5 flex flex-col gap-5">
        <Cards />

        <CategoriesScroller />
        {quizzes && <QuizzesCardsScroller quizzes={quizzes} title="MOMEN" />}
      </div>
    </div>
  );
}
