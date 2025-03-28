// import Editor from "@/components/Editor2/Editor";
import EditorProvider from "@/components/Editor/EditorProvider";
import ErrorPage from "@/components/Layout/ErrorPage";
import { getEditorQuiz } from "@/lib/actions/editor";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import fakeEditorQuiz from "@/fake-data/editor-quiz.json";
import { EditorQuiz } from "@/types";
export default async function Page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser();

  if (process.env.NEXT_PUBLIC_USE_FAKE_DATA === "true") {
    return (
      <EditorProvider initialQuiz={fakeEditorQuiz as unknown as EditorQuiz} />
    );
  }

  if (!session) {
    return redirect("/login");
  }

  const { success, initialQuiz, message } = await getEditorQuiz({
    quizId,
  });

  if (!initialQuiz || !success) {
    return (
      <div className="w-full h-screen flex items-center justify-center main-background">
        <ErrorPage message={message} />;
      </div>
    );
  }

  return <EditorProvider initialQuiz={initialQuiz} />;
}
