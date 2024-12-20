import Settings from '@/components/Settings/Settings'
import { getSettingsUser } from '@/lib/actions/user'
import React from 'react'

export default async function page() {

  const {success, user} = await getSettingsUser()
  if(!success || !user) {
    return '??'
  }
  return (
    <Settings user={user} />
  )
}
