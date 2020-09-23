import { SessionContext } from "blitz"
import db, { ApplicationDeleteArgs } from "db"

type DeleteApplicationInput = {
  where: ApplicationDeleteArgs["where"]
}

export default async function deleteApplication(
  { where }: DeleteApplicationInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const application = await db.application.delete({ where })

  return application
}
