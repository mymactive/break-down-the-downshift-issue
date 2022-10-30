import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AsyncExample } from '.'

test('Search "Annna Kareina" and click this book, then, textbox has the value "Anna Karenina"', async () => {
  const user = userEvent.setup()
  render(<AsyncExample />)

  await user.type(screen.getByRole('combobox', { name: /book/ }), 'Anna')

  await user.click(screen.getByText(/Anna Karenina/))

  expect(screen.getByRole('combobox', { name: /book/ })).toHaveValue(
    'Anna Karenina'
  )
})
