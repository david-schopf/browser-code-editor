import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a navigation element', () => {
  render(<App />);
  const linkElement = screen.getByRole(/navigation/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the main window message', () => {
  render(<App />);
  const noFileMessage = screen.getByText(/Create, select or open a file to see its content/i);
  expect(noFileMessage).toBeInTheDocument();
});
