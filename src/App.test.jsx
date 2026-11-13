
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('RESTy Application', () => {
  test('renders the RESTy header', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /RESTy/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('submits a GET request and displays API results', async () => {
    const user = userEvent.setup();
  
    render(<App />);
  
    const urlInput = screen.getByRole('textbox');
  
    await user.type(
      urlInput,
      'https://jsonplaceholder.typicode.com/users'
    );
  
    await user.click(
      screen.getByRole('button', { name: /GO!/i })
    );
  
    expect(
      screen.getByText(/Request Method: GET/i)
    ).toBeInTheDocument();
  
    expect(
      screen.getByText(/URL: https:\/\/jsonplaceholder.typicode.com\/users/i)
    ).toBeInTheDocument();
  
    expect(
      await screen.findByText('Response Headers')
    ).toBeInTheDocument();
  
    expect(
      screen.getByText('Response Results')
    ).toBeInTheDocument();
  
    expect(
      await screen.findByText(/Warehouse One/i)
    ).toBeInTheDocument();
    
    expect(
      screen.getByText(/Warehouse Two/i)
    ).toBeInTheDocument();
  });
});
