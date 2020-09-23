import { SessionContext } from "blitz"
import db, { ApplicationCreateArgs } from "db"

type CreateApplicationInput = {
  data: ApplicationCreateArgs["data"]
}
export default async function createApplication(
  { data }: CreateApplicationInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const application = await db.application.create({ data })

  return application
}
