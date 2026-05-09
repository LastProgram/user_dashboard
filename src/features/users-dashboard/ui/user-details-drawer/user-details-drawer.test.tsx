import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { UseUserDetailsResult } from '@/features/users-dashboard/api/use-user-details'
import { useUserDetails } from '@/features/users-dashboard/api/use-user-details'
import { UserDetailsDrawer } from '@/features/users-dashboard/ui/user-details-drawer'
import { createUserFixture } from '@/test/factories/user.factory'

vi.mock('@/features/users-dashboard/api/use-user-details', () => ({
  useUserDetails: vi.fn(),
}))

const mockedUseUserDetails = vi.mocked(useUserDetails)

function createUserDetailsResult(
  overrides: Partial<UseUserDetailsResult> = {},
): UseUserDetailsResult {
  return {
    user: null,
    status: 'idle',
    isIdle: true,
    isLoading: false,
    isError: false,
    error: null,
    reload: vi.fn(),
    ...overrides,
  }
}

describe('UserDetailsDrawer', () => {
  it('does not render the dialog when closed', () => {
    mockedUseUserDetails.mockReturnValue(createUserDetailsResult())

    render(
      <UserDetailsDrawer
        userId={1}
        isOpen={false}
        onClose={vi.fn()}
      />,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the loading state when user details are loading', () => {
    mockedUseUserDetails.mockReturnValue(
      createUserDetailsResult({
        status: 'loading',
        isIdle: false,
        isLoading: true,
      }),
    )

    render(
      <UserDetailsDrawer
        userId={1}
        isOpen
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByLabelText(/loading details/i)).toBeInTheDocument()
  })

  it('renders loaded user details', () => {
    const user = createUserFixture({
      fullName: 'Alice Morgan',
      email: 'alice.morgan@example.com',
      companyName: 'Northwind',
      companyTitle: 'Operations Lead',
      department: 'Operations',
      city: null,
      country: 'United States',
      university: null,
    })

    mockedUseUserDetails.mockReturnValue(
      createUserDetailsResult({
        user,
        status: 'success',
        isIdle: false,
      }),
    )

    render(
      <UserDetailsDrawer
        userId={1}
        isOpen
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Alice Morgan' })).toBeInTheDocument()
  })

  it('calls onClose from the close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    mockedUseUserDetails.mockReturnValue(createUserDetailsResult())

    render(
      <UserDetailsDrawer
        userId={1}
        isOpen
        onClose={onClose}
      />,
    )

    await user.click(screen.getByRole('button', { name: /close details/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls reload from the error retry action', async () => {
    const user = userEvent.setup()
    const reload = vi.fn()

    mockedUseUserDetails.mockReturnValue(
      createUserDetailsResult({
        status: 'error',
        isIdle: false,
        isError: true,
        error: 'Profile request failed',
        reload,
      }),
    )

    render(
      <UserDetailsDrawer
        userId={1}
        isOpen
        onClose={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: /try again/i }))

    expect(reload).toHaveBeenCalledTimes(1)
  })
})
