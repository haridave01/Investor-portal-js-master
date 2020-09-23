import * as z from "zod"

export const ApplicationInput = z.object({
  name: z.string(),
  accountId: z.number().positive().int(),
})
export type ApplicationInputType = z.infer<typeof ApplicationInput>
