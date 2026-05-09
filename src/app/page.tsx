import { Suspense } from 'react'

import Loading from '@/app/loading'
import { UsersDashboard } from '@/features/users-dashboard/ui/users-dashboard'

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <UsersDashboard />
    </Suspense>
  )
}
