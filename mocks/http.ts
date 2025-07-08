import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import { handlers } from '@/mocks/handlers';
import { postsHandlers } from './posts-handlers';
import { articlesHandlers } from '@/mocks/articles-handlers';
import { blogPostsHandlers } from '@/mocks/blog-posts-handler';
import { blogUsersHandlers } from '@/mocks/blog-users-handlers';

//nodejs - express 웹서버 , 9090포트
const app = express();
const port = 9090;

// 미들웨어
app.use(
  cors({
    origin: 'http://localhost:3000', // 클라이언트 주소
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  createMiddleware(
    ...handlers,
    ...postsHandlers,
    ...articlesHandlers,
    ...blogPostsHandlers,
    ...blogUsersHandlers
  )
); //msw핸들러 연결

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
