import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import { useSession } from '@supabase/auth-helpers-react';

jest.mock('@supabase/auth-helpers-react', () => ({
  useSession: jest.fn(),
}));

describe('Home', () => {
  it('renders the login page when there is no session', () => {
    (useSession as jest.Mock).mockReturnValue(null); // Simulate no session

    render(<Home />);
    expect(screen.getByText(/Spacemart/i)).toBeInTheDocument();
  });

  it('renders user id when session is present', () => {
    const mockSession = { user: { id: 'test-user-id' } };
    (useSession as jest.Mock).mockReturnValue(mockSession); // Simulate session

    render(<Home />);
    expect(screen.getByText('test-user-id')).toBeInTheDocument();
  });

  it('renders footer links correctly when session is present', () => {
    const mockSession = { user: { id: 'test-user-id' } };
    (useSession as jest.Mock).mockReturnValue(mockSession); // Simulate session

    render(<Home />);
    expect(screen.getByRole('link', { name: /Learn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Examples/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to nextjs.org →/i })).toBeInTheDocument();
  });
});