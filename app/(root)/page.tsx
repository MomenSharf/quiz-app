import Cards from "@/components/Home/Cards";
import Header from "@/components/Layout/Header";

export default async function Home() {
  // const quizzes = await getHomeQuizzes();

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center">
        <Cards />
      </div>
    </div>
  );
}
