import React from 'react';
import { render, screen } from '@testing-library/react';
import { Auth } from '@supabase/auth-ui-react';
import LoginPage from '../src/components/auth/auth-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

jest.mock('@supabase/auth-helpers-react', () => ({
  useSupabaseClient: jest.fn(),
}));

describe('LoginPage', () => {
  const mockSupabaseClient = {
    // Mock any required methods from the Supabase client here if needed
  };

  beforeEach(() => {
    (useSupabaseClient as jest.Mock).mockReturnValue(mockSupabaseClient);
  });

  it('renders the login page correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText(/Spacemart/i)).toBeInTheDocument();
    expect(screen.getByText(/Buy and sell space assets/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Threads/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Documentation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeInTheDocument(); // Adjust this based on actual button text in Auth
  });
});