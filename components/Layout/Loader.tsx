import React from 'react'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'

export default function Loader({className}: {className?: string}) {
  return (
    <Icons.Loader  className={cn("w-4 h-4 animate-spin stroke-primary-foreground", className)} />
  )
}
