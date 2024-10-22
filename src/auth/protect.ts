import { AuthenticationError } from '@/app/util'
import { validateRequest } from '@/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function assertAuthenticated() {
  const { user } = await validateRequest()
  if (!user) {
    throw new AuthenticationError()
  }
  return user
}

export async function assertAuthenticatedAndRedirect(redirectTo: string) {
  const { user } = await validateRequest()
  if (!user) {
    // Get the current path to redirect back after login
    const headersList = headers()
    const currentPath = headersList.get('x-path') || '/'
    redirect(`/sign-in?redirectTo=${encodeURIComponent(currentPath)}`)
  }
  return user
}