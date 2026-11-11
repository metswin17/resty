
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('RESTy Application', () => {
  test('renders the RESTy header', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /RESTy/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('submits a GET request and displays request details', async () => {
    const user = userEvent.setup();

    render(<App />);

    const urlInput = screen.getByRole('textbox');

    await user.type(
      urlInput,
      'https://jsonplaceholder.typicode.com/users'
    );

    
await user.click(screen.getByRole('button', { name: /GO!/i }));

expect(screen.getByText(/Loading.../i))
  .toBeInTheDocument();

expect(
  await screen.findByText(/Request Method: GET/i, {}, { timeout: 3000 })
).toBeInTheDocument();

expect(
  screen.getByText(/URL: https:\/\/jsonplaceholder.typicode.com\/users/i)
).toBeInTheDocument();


const results = document.querySelector('section');

expect(results).toHaveTextContent('fake thing 1');
expect(results).toHaveTextContent('fake thing 2');

});
});
