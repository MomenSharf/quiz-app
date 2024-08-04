import Image from 'next/image'
import React from 'react'
import NewQuizButton from './Quizzes/NewQuizButton'
import NewFolderButton from './Folders/NewFolderButton'


type EmptyQuizGallery = {
  userId: string
  folderId?: string 
}

export default function EmptyQuizzesGallery({userId, folderId}: EmptyQuizGallery) {
  return (
    <div className='flex flex-col gap-1 justify-center items-center h-full'>
      <div className=''>
        <Image src='/assets/images/brain.svg' alt='empty gallery' width={250} height={250} />
      </div>
      <h4 className='font-medium'>No Quizzes yet</h4>
      <p className='text-muted-foreground'>You can create Quizzes her</p>
      <div className="flex gap-3">
        <NewQuizButton
          userId={userId}
          folderId={folderId}
          className="w-fit rounded-full"
          pathname="/my-quizzes"
        />
        <NewFolderButton
          userId={userId}
          folderId={folderId}
          className="w-fit rounded-full"
          pathname="/my-quizzes"
        />
      </div>
    </div>
  )
}
