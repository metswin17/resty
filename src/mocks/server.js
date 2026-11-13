import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Warehouse One',
      },
      {
        id: 2,
        name: 'Warehouse Two',
      },
    ]);
  })
);