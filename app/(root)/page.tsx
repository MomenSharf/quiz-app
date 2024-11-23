import Cards from "@/components/Home/Cards";
import CategoriesSlider from "@/components/Home/CategoriesSlider";
import Header from "@/components/Layout/Header";

export default async function Home() {
  // const quizzes = await getHomeQuizzes();

  return (
    <div className="flex flex-col">
      <Header />
      <div className="container my-3 flex flex-col gap-3">
      <Cards />
      <CategoriesSlider />

      </div>
    </div>
  );
}
