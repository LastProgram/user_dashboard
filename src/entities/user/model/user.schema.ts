import { z } from 'zod'

const RawDummyJsonUserRoleSchema = z.enum(['admin', 'moderator', 'user'])

const RawDummyJsonCompanySchema = z
  .object({
    name: z.string().nullish(),
    title: z.string().nullish(),
    department: z.string().nullish(),
  })
  .nullish()

const RawDummyJsonAddressSchema = z
  .object({
    city: z.string().nullish(),
    country: z.string().nullish(),
  })
  .nullish()

export const RawDummyJsonUserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string(),
  phone: z.string().nullish(),
  image: z.string().nullish(),
  role: RawDummyJsonUserRoleSchema,
  company: RawDummyJsonCompanySchema,
  address: RawDummyJsonAddressSchema,
  university: z.string().nullish(),
})

export const RawDummyJsonUsersResponseSchema = z.object({
  users: z.array(RawDummyJsonUserSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type RawDummyJsonUser = z.infer<typeof RawDummyJsonUserSchema>
export type RawDummyJsonUsersResponse = z.infer<
  typeof RawDummyJsonUsersResponseSchema
>
