import Image from 'next/image'
import React from 'react'
import NewQuizButton from './CreateQuiz/NewQuizButton'

type EmptyQuizGallery = {
  userId: string
}

export default function EmptyQuizzesGallery({userId}: EmptyQuizGallery) {
  return (
    <div className='flex flex-col gap-1 justify-center items-center h-full'>
      <div className='w-40 h-40'>
        <Image src='/assets/images/creative.png' alt='empty gallery' width={500} height={500} />
      </div>
      <h4 className='font-medium'>No Quizzes yet</h4>
      <p className='text-muted-foreground'>You can create Quizzes her</p>
      <NewQuizButton className='mt-2' userId={userId} pathname='/my-quizzes'/>
    </div>
  )
}
