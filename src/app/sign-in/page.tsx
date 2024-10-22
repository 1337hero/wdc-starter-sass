import { assertAuthenticated } from '@/auth/protect'

export default async function DashboardPage() {
  // Will throw AuthenticationError if not authenticated
  const user = await assertAuthenticated()
  
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      {/* Dashboard content */}
    </div>
  )
}