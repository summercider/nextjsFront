import { http, HttpResponse } from 'msw';
import blogUsers from './blog-users.json';

let maxId = Math.max(...blogUsers.map((item) => item.id));

export const blogUsersHandlers = [
  http.get('http://localhost:9090/blog-users/:id', async ({ params }) => {
    await sleep(2000);

    const { id } = params;
    // parseInt는 undefined일 경우 경고뜨므로 Number사용
    const blogUser = blogUsers.find((user) => user.id === Number(id));

    return HttpResponse.json(blogUser);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
