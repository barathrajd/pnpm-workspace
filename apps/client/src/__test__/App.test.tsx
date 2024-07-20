import { render } from '@testing-library/react';
import { test, describe, expect } from 'vitest';
import App from '../App';

describe('App test', () => {
  test('should have the test app', () => {
    const screen = render(<App />);
    const text = screen.getByText('App');
    expect(text).toHaveTextContent(/App/);
  });

  test('should have the app url as https://google.com', () => {
    const screen = render(<App />);
    const text = screen.getByRole('heading');
    expect(text).toHaveTextContent(/https:\/\/google.com/);
  });
});
