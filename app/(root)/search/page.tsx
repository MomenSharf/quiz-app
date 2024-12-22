import { searchQuizzes } from "@/lib/actions/search";
import React from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const { success, message, quizzes } = await searchQuizzes(query);

  if (!success) {
    return <p>{message}</p>;
  }
  return (
    <div>
      {quizzes?.map((quiz) => {
        return <div key={quiz.id}>{quiz.title}</div>;
      })}
    </div>
  );
}
