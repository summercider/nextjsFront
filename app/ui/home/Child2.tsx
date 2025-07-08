// 'use client';
import { use } from 'react'; //부모에서 보내준 데이터 프롭 받을떄 사용해야함

export default function Child2({
  posts,
}: {
  posts: Promise<
    {
      id: number;
      title: string;
      content: string;
    }[]
  >;
}) {
  //promise 결과 받을떄 use훅사용
  //클라,서버 둘다 가능
  // promise 완료를 기다린후 jsx리턴
  const allPosts = use(posts);

  // console.log(posts);
  // console.log(allPosts);

  return (
    <div>
      {allPosts.map((item) => (
        <li key={item.id}> {item.title}</li>
      ))}
    </div>
  );
}
