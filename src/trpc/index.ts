import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server"

export const appRouter = router({
  authCallback: publicProcedure.query(() => {
    const { getUser } = getKindeServerSession()
    const users = getUser()

    if (!users.id || !users.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      })
    }
    return { success: true }
  }),
})

export type AppRouter = typeof appRouter
