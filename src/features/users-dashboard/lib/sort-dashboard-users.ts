import type { User } from '@/entities/user/model/user.types'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'

function compareText(leftValue: string, rightValue: string) {
  return leftValue.localeCompare(rightValue)
}

function compareUsersByName(leftUser: User, rightUser: User) {
  return compareText(leftUser.fullName, rightUser.fullName)
}

function compareUsersByAge(leftUser: User, rightUser: User) {
  return leftUser.age - rightUser.age
}

function compareUsersByCompany(leftUser: User, rightUser: User) {
  const companyCompareResult = compareText(
    leftUser.companyName,
    rightUser.companyName,
  )

  if (companyCompareResult !== 0) {
    return companyCompareResult
  }

  return compareUsersByName(leftUser, rightUser)
}

export function sortDashboardUsers(users: User[], sort: DashboardQuery['sort']) {
  const sortedUsers = [...users]

  switch (sort) {
    case 'name-asc':
      return sortedUsers.sort(compareUsersByName)

    case 'name-desc':
      return sortedUsers.sort((leftUser, rightUser) =>
        compareUsersByName(rightUser, leftUser),
      )

    case 'age-asc':
      return sortedUsers.sort(compareUsersByAge)

    case 'age-desc':
      return sortedUsers.sort((leftUser, rightUser) =>
        compareUsersByAge(rightUser, leftUser),
      )

    case 'company-asc':
      return sortedUsers.sort(compareUsersByCompany)

    case 'company-desc':
      return sortedUsers.sort((leftUser, rightUser) =>
        compareUsersByCompany(rightUser, leftUser),
      )
  }
}
