'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

type Article = { id: number; title: string; content: string };

export default function Article({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: 'ko' | 'en' | 'fr' }>;
}) {
  const { articleId } = use(params); // client일경우 엔 use 훅 사용>promise해제함
  const { lang = 'ko' } = use(searchParams);
  // console.log(articleId, lang);

  const route = useRouter();

  const { isPending, data, isError, error } = useQuery<Article>({
    queryKey: ['articles', articleId],
    queryFn: () =>
      fetch(`http://localhost:9090/articles/${articleId}`).then((res) =>
        res.json()
      ),
  });

  return (
    <main className=" p-[30px]">
      <button
        type="button"
        onClick={() => route.back()}
        className="btn px-[10px] leading-[28px] mb-[10px]"
      >
        뒤로가기
      </button>
      <h2 className="text-[26px] font-bold">뉴스기사 {articleId}</h2>
      <p className="my-[20px]">언어 : {lang}로 읽기</p>
      {isPending && <p>준비중........</p>}
      {isError && <p>{error.message}</p>}
      {data && (
        <>
          <h3 className="text-[20px] font-medium text-gray-600 mb-[20px]">
            {data.title}
          </h3>
          <p>{data.content}</p>
        </>
      )}

      <div className="space-x-[10px] mt-[30px]">
        <Link
          href={`/articles/${articleId}?lang=ko`}
          className={lang === 'ko' ? 'text-point1' : ''}
        >
          korean
        </Link>
        <Link
          href={`/articles/${articleId}?lang=en`}
          className={lang === 'en' ? 'text-point1' : ''}
        >
          english
        </Link>
        <Link
          href={`/articles/${articleId}?lang=fr`}
          className={lang === 'fr' ? 'text-point1' : ''}
        >
          franch
        </Link>
      </div>
    </main>
  );
}
