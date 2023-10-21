import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, redirect } from "next/navigation"

import { db } from "@/db"

interface PageProps {
  params: {
    fileId: string
  }
}

const Page = async ({ params }: PageProps) => {
  //retrieve the file id
  const { fileId } = params
  const { getUser } = getKindeServerSession()
  const user = getUser()

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`)
  //make db call
  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  })
  if (!file) notFound()

  return <div>{fileId}</div>
}

export default Page
