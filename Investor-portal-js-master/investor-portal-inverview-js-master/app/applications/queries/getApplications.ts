import { SessionContext } from "blitz"
import db, { FindManyApplicationArgs } from "db"

type GetApplicationsInput = {
  where?: FindManyApplicationArgs["where"]
  orderBy?: FindManyApplicationArgs["orderBy"]
  skip?: FindManyApplicationArgs["skip"]
  take?: FindManyApplicationArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyApplicationArgs['include']
}

export default async function getApplications(
  { where, orderBy, skip = 0, take }: GetApplicationsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const applications = await db.application.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.application.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    applications,
    nextPage,
    hasMore,
  }
}
