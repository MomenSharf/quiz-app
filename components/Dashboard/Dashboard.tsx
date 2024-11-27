import React from 'react'
import { useDashboardContext } from './Context'
import EmptyDashboard from './EmptyDashboard'
import Header from './Header'
import { Separator } from '../ui/separator'
import Table from './Table'

export default function Dashboard() {

  const {quizzes, folderWithQuizzes} = useDashboardContext()

  if(quizzes.length === 0 && folderWithQuizzes.length === 0)  {
    return <EmptyDashboard />
  }
  return (
    <div className='flex flex-col gap-5 p-3 w-full'>
      <Header />
      <Separator />
      <Table />
    </div>
  )
}
