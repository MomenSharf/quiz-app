import Cards from "@/components/Home/Cards";
import CategoriesScroller from "@/components/Home/CategoriesScroller";
import Quizzes from "@/components/Home/Quizzes";
import Header from "@/components/Layout/Header";
import QuizzesCardsScroller from "@/components/Quiz/QuizzesCardsScroller";
import { getHomeQuizzes } from "@/lib/actions/home";
import { getSearchQuizzes } from "@/lib/actions/search";
import { db } from "@/lib/db";
import { getHomeQuizzesArgs } from "@/lib/utils";

export default async function Home() {
  const result = await getHomeQuizzes();
 

  const args = getHomeQuizzesArgs()

  return (
    <div className="flex flex-col">
      <div className="container p-2 sm:p-4 mt-1 sm:mt-3 mb-5 flex flex-col gap-5">
        <Cards />
        <CategoriesScroller />
        <Quizzes args={args} />
        
      </div>
    </div>
  );
}
