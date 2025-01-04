import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { Icons } from '../icons'

export default function NotFoundPage() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <h1 className='text-6xl font-bold text-blue-extra-dark flex items-center'>4
        <Icons.alert className='w-14 h-14 fill-destructive' />
        4</h1>
      <h2 className='text-lg text-blue-extra-dark font-bold'>Page Not Found</h2>
      <p className='text-xs text-gray-dark'>Sorry, we {"can't"} find the page {"you're"} looking for.</p>
      <Link className={cn(buttonVariants(),'rounded-full')} href='/'>Back to Home</Link>
    </div>
  )
}
