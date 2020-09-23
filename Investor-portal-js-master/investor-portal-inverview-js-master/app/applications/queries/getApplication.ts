import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneApplicationArgs } from "db"

type GetApplicationInput = {
  where: FindOneApplicationArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneApplicationArgs['include']
}

export default async function getApplication(
  { where /* include */ }: GetApplicationInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const application = await db.application.findOne({ where })

  if (!application) throw new NotFoundError()

  return application
}
