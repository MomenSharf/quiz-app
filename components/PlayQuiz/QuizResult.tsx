import React from 'react'
import { usePlayQuizContext } from './Context'

export default function QuizResult() {
  const {state: playQuizQuestions} =usePlayQuizContext()
  return (
    <div>{JSON.stringify(playQuizQuestions, null,2 )}</div>
  )
}
