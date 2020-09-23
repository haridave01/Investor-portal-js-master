import { SessionContext } from "blitz"
import db, { ApplicationUpdateArgs } from "db"

type UpdateApplicationInput = {
  where: ApplicationUpdateArgs["where"]
  data: ApplicationUpdateArgs["data"]
}

export default async function updateApplication(
  { where, data }: UpdateApplicationInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const application = await db.application.update({ where, data })

  return application
}
