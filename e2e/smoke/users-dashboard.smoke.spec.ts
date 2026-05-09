import { expect, test } from '@playwright/test'

const usersResponse = {
  users: [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Cooper',
      age: 29,
      gender: 'female',
      email: 'jane.cooper@example.com',
      phone: '+1 555 0100',
      image: null,
      role: 'admin',
      company: {
        name: 'Acme Corp',
        title: 'Product Manager',
        department: 'Product',
      },
      address: {
        city: 'New York',
        country: 'United States',
      },
      university: 'Example University',
    },
    {
      id: 2,
      firstName: 'Alice',
      lastName: 'Morgan',
      age: 34,
      gender: 'female',
      email: 'alice.morgan@example.com',
      phone: '+1 555 0101',
      image: null,
      role: 'moderator',
      company: {
        name: 'Northwind',
        title: 'Operations Lead',
        department: 'Operations',
      },
      address: {
        city: 'Boston',
        country: 'United States',
      },
      university: 'Northwind University',
    },
  ],
  total: 2,
  skip: 0,
  limit: 0,
}

test.beforeEach(async ({ page }) => {
  await page.route('**/users**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(usersResponse),
    })
  })
})

test('opens the users dashboard route', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Users Dashboard' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Find people faster' }),
  ).toBeVisible()
  await expect(page.getByText('Showing 2 of 2 profiles')).toBeVisible()
  await expect(
    page.getByRole('table').getByText('Jane Cooper'),
  ).toBeVisible()
})
