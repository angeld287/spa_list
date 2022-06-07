import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTable from './index';

test('It must render the table component', () => {
  render(<CustomTable />);
  const text = screen.getByText(/My Table/);
  expect(text).toBeInTheDocument();
});
