import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"

const AuthCallbackPage = async () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")
  // const apiResponse = await fetch("/api/auth/whatever")
  // const data = await apiResponse.json()

  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      //user is synced to DB
      if (success) {
        router.push(origin ? `/${origin}` : `/dashboard`)
      }
    },
  })
}

export default AuthCallbackPage
