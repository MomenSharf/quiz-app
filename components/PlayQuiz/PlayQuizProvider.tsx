'use client'
import React from 'react'
import { PlayQuizProvider as Provider } from './PlayQuizContext'
import PlayQuiz from './PlayQuiz'
import { EditorQuiz } from '@/types'

export default function PlayQuizProvider({quiz}:{quiz: EditorQuiz}) {

  
  return (
    <Provider quiz={quiz}>
      <PlayQuiz />
    </Provider>
  )
}
