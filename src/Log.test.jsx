import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import Login from './Login';

test('should render username, password fields, and login button', () => {
  render(<Login />); 
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('should update username input value on change', () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText(/username/i);
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  expect(usernameInput.value).toBe('testuser');
});