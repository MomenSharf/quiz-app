import React from 'react'
import { PlayQuizQuestion } from '../Context';

export default function MatchingPairs({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const items = question.items.map(item => item.text)
  const matches = question.items.map(item => item.match)
  return (
    <div>MatchingPairs</div>
  )
}
