import ErrorPage from "@/components/Layout/ErrorPage";
import { newQuiz } from "@/lib/actions/quiz";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getCurrentUser();

  if (!session) {
    return redirect('/login?callbackUrl=/editor/new');
  }

  const {success, message, quiz} = await newQuiz({})

  if(quiz && success) {
    return redirect(`/editor/${quiz.id}`)
  }else {
    return <ErrorPage message={message}/>
  }
}
