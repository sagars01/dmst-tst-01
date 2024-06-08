import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import AccountsPage from '../src/app/accounts/page'

test('Accounts Page', () => {
    render(<AccountsPage />)
    waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: 'Balance Sheet' })).toBeDefined()
    })
})
