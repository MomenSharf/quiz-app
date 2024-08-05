import { getQuiz } from '@/lib/actions/quiz.actions'
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("/login");
  }
  
  const quiz = await getQuiz(quizId)

  console.log(quiz);
  
  return (
    <div>

    </div>
  )
}
