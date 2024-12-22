import Cards from "@/components/Home/Cards";
import CategoriesScroller from "@/components/Home/CategoriesScroller";
import Header from "@/components/Layout/Header";

export default async function Home() {
  // const quizzes = await getHomeQuizzes();

  return (
    <div className="flex flex-col">
      <div className="container mt-3 mb-5 flex flex-col gap-5">
        <Cards />
        <CategoriesScroller />
      </div>
    </div>
  );
}
