"use client";

import { AUTHENTICATION_ERROR_MESSAGE } from "@/app/util";
import { Button } from "@/components/ui/button";
import { pageTitleStyles } from "@/styles/common";
import Link from "next/link";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isAuthError = error.message === AUTHENTICATION_ERROR_MESSAGE

  if (isAuthError) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl mb-4">Authentication Required</h1>
        <p className="mb-4">Please sign in to access this page.</p>
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl mb-4">Error</h1>
      <p>{error.message}</p>
    </div>
  )
}