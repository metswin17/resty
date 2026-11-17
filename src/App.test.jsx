
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './mocks/server';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
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

  test('restores history without making another API request', async () => {
    const user = userEvent.setup();
    const usersRequest = vi.fn();
  
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users', () => {
        usersRequest();
  
        return HttpResponse.json([
          { id: 1, name: 'Warehouse One' },
          { id: 2, name: 'Warehouse Two' },
        ]);
      })
    );
  
    render(<App />);
  
    const urlInput = screen.getByRole('textbox');
    const goButton = screen.getByRole('button', { name: /GO!/i });
  
    // First API request
    await user.type(
      urlInput,
      'https://jsonplaceholder.typicode.com/users'
    );
    await user.click(goButton);
  
    expect(
      await screen.findByText(/Warehouse One/i)
    ).toBeInTheDocument();
  
    // Second API request
    await user.clear(urlInput);
    await user.type(
      urlInput,
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    await user.click(goButton);
  
    expect(
      await screen.findByText(/RESTy History Test Post/i)
    ).toBeInTheDocument();
  
    // Restore the first response from History
    await user.click(
      screen.getByRole('button', {
        name: /GET - https:\/\/jsonplaceholder.typicode.com\/users/i,
      })
    );
  
    expect(
      await screen.findByText(/Warehouse One/i)
    ).toBeInTheDocument();
  
    expect(
      screen.getByText(/Warehouse Two/i)
    ).toBeInTheDocument();
  
    // The users API should have been called only once
    expect(usersRequest).toHaveBeenCalledTimes(1);
  });

});
