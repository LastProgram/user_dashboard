export type UserRole = 'admin' | 'moderator' | 'user'

export interface User {
  id: number
  fullName: string
  email: string
  age: number
  gender: string
  phone: string | null
  image: string | null
  role: UserRole
  companyName: string
  companyTitle: string
  department: string
  city: string | null
  country: string | null
  university: string | null
}
