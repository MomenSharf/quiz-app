import React from 'react'
import SignOut from '../Auth/SignOut'

export default function SignOutCard() {
  return (
    <div className="bg-card p-3 clear-start flex justify-center items-center rounded-lg h-20">
        <SignOut variant="destructive" iconClassName='text-primary-foreground' /> 
      </div>
  )
}
