import React from 'react';
import { render, screen } from '@testing-library/react';
import Materials from '../components/Materials';

test('renders materials component', () => {
  render(<Materials targetURL={"http://localhost:3001/materials"} />);
  const addButton = screen.getByRole('button', { name: 'add-button' });
  expect(addButton).toBeInTheDocument();
  const deleteButton = screen.getByRole('button', { name: 'delete-button' });
  expect(deleteButton).toBeInTheDocument();
  const list = screen.getByRole('div', { name: 'material-list' });
  expect(list).toBeInTheDocument();
  const cost = screen.getByRole('p', { name: 'cost-counter' });
  expect(cost).toBeInTheDocument();
});
