import React from 'react'
import { useDashboardContext } from './Context'
import EmptyDashboard from './EmptyDashboard'
import Header from './Header'

export default function Dashboard() {

  const {quizzes, folderWithQuizzes} = useDashboardContext()

  if(quizzes.length === 0 && folderWithQuizzes.length === 0)  {
    return <EmptyDashboard />
  }
  return (
    <div className='flex flex-col p-3 w-full'>
      <Header />
    </div>
  )
}
