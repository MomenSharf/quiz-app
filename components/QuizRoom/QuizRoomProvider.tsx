'use client'
import React from 'react'
import { QuizRoomProvider as Provider } from './QuizRoomContext'
import QuizRoom from './QuizRoom'

export default function QuizRoomProvider({quizRoomId}:{quizRoomId: string}) {

  
  return (
    <Provider quizRoomId={quizRoomId}>
      <QuizRoom quizRoomId={quizRoomId}/>
    </Provider>
  )
}
