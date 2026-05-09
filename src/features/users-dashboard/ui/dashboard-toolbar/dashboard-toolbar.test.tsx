import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DashboardToolbar } from '@/features/users-dashboard/ui/dashboard-toolbar'
import { DEFAULT_DASHBOARD_QUERY } from '@/features/users-dashboard/model/dashboard.constants'
import type { DashboardQuery } from '@/features/users-dashboard/model/dashboard.types'

const activeQuery: DashboardQuery = {
  search: 'Jane',
  role: 'admin',
  department: 'Product',
  sort: 'age-desc',
  page: 2,
}

function renderDashboardToolbar({
  query = DEFAULT_DASHBOARD_QUERY,
  canExport = true,
  onDepartmentChange = vi.fn(),
  onExport = vi.fn(),
  onReset = vi.fn(),
  onRoleChange = vi.fn(),
  onSearchChange = vi.fn(),
  onSortChange = vi.fn(),
}: {
  query?: DashboardQuery
  canExport?: boolean
  onDepartmentChange?: (value: string) => void
  onExport?: () => void
  onReset?: () => void
  onRoleChange?: (value: DashboardQuery['role']) => void
  onSearchChange?: (value: string) => void
  onSortChange?: (value: DashboardQuery['sort']) => void
} = {}) {
  render(
    <DashboardToolbar
      query={query}
      departmentOptions={['Engineering', 'Product', 'Support']}
      totalUsers={10}
      visibleUsers={3}
      canExport={canExport}
      onExport={onExport}
      onSearchChange={onSearchChange}
      onRoleChange={onRoleChange}
      onDepartmentChange={onDepartmentChange}
      onSortChange={onSortChange}
      onReset={onReset}
    />,
  )
}

function SearchControlledDashboardToolbar({
  onSearchChange,
}: {
  onSearchChange: (value: string) => void
}) {
  const [query, setQuery] = useState<DashboardQuery>(DEFAULT_DASHBOARD_QUERY)

  return (
    <DashboardToolbar
      query={query}
      departmentOptions={['Engineering', 'Product', 'Support']}
      totalUsers={10}
      visibleUsers={3}
      canExport
      onSearchChange={(search) => {
        setQuery((currentQuery) => ({
          ...currentQuery,
          search,
        }))
        onSearchChange(search)
      }}
    />
  )
}

describe('DashboardToolbar', () => {
  it('renders the current result count', () => {
    renderDashboardToolbar()

    expect(screen.getByText('Showing 3 of 10 profiles')).toBeInTheDocument()
  })

  it('disables reset when the query is default', () => {
    renderDashboardToolbar()

    expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled()
  })

  it('calls reset when the query is active', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()

    renderDashboardToolbar({
      query: activeQuery,
      onReset,
    })

    await user.click(screen.getByRole('button', { name: /reset/i }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('disables export when there is no exportable result', () => {
    renderDashboardToolbar({
      canExport: false,
    })

    expect(screen.getByRole('button', { name: /export csv/i })).toBeDisabled()
  })

  it('calls export when export is enabled', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()

    renderDashboardToolbar({
      onExport,
    })

    await user.click(screen.getByRole('button', { name: /export csv/i }))

    expect(onExport).toHaveBeenCalledTimes(1)
  })

  it('calls search change with the typed value', async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()

    render(<SearchControlledDashboardToolbar onSearchChange={onSearchChange} />)

    await user.type(screen.getByRole('textbox', { name: /search users/i }), 'Ann')

    expect(onSearchChange).toHaveBeenLastCalledWith('Ann')
  })

  it('calls role change with the selected role', async () => {
    const user = userEvent.setup()
    const onRoleChange = vi.fn()

    renderDashboardToolbar({
      onRoleChange,
    })

    await user.selectOptions(
      screen.getByRole('combobox', { name: /filter by role/i }),
      'moderator',
    )

    expect(onRoleChange).toHaveBeenCalledWith('moderator')
  })

  it('calls department change with the selected department', async () => {
    const user = userEvent.setup()
    const onDepartmentChange = vi.fn()

    renderDashboardToolbar({
      onDepartmentChange,
    })

    await user.selectOptions(
      screen.getByRole('combobox', { name: /filter by department/i }),
      'Engineering',
    )

    expect(onDepartmentChange).toHaveBeenCalledWith('Engineering')
  })

  it('calls sort change with the selected sort value', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()

    renderDashboardToolbar({
      onSortChange,
    })

    await user.selectOptions(
      screen.getByRole('combobox', { name: /sort users/i }),
      'company-desc',
    )

    expect(onSortChange).toHaveBeenCalledWith('company-desc')
  })
})
