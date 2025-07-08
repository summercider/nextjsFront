'use client';

import Pagination from '@/app/ui/pagination';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

type Article = { id: number; title: string; content: string };

function BoldText({ text, keyword }: { text: string; keyword: string }) {
  // console.log(text, keyword);
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  // split후 기준문자 포함되려면 정규표현식 그룹()
  // 정규표현식 내부 변수사용시 RegExp 객체사용
  // "gi" 는 옵션이며 g는 global , i는 문자열 전체 ignore case 대소문자 구분안함
  // console.log(parts);
  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === keyword?.toLowerCase() ? (
          <b key={idx}>{part}</b>
        ) : (
          part
        )
      )}
    </>
  );
}

// function BoldText({ text, keyword }: { text: string; keyword: string }) {
//   let content;

//   if (!keyword || !text.includes(keyword)) {
//     content = <>{text}</>;
//   } else {
//     const parts = text.split(keyword);
//     content = parts.map((part, index) => (
//       <p key={index}>
//         {part}
//         {index < parts.length - 1 && <b>{keyword}</b>}
//       </p>
//     ));
//   }

//   return <span>{content}</span>;
// }

export default function Articles({
  searchParams,
}: {
  searchParams: Promise<{ search: string; page: string }>;
}) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const paramsObj = use(searchParams); // next 지원 use hook > promise해제
  const [params] = useState(new URLSearchParams(paramsObj)); //promise아닌 값 URL객체로 params state 변수에 저장
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const { isPending, data, isError, error } = useQuery<{
    result: Article[];
    total: number;
  }>({
    queryKey: ['articles', page, paramsObj.search],
    queryFn: () => {
      return fetch(
        `http://localhost:9090/articles?page=${page}&search=${paramsObj.search}`
      ).then((res) => res.json());
    },
  });

  // data 변경시 totalpage 연산
  useEffect(() => {
    if (data) {
      setTotalPage(Math.ceil(data?.total / 5) || 0);
    }
  }, [data]);

  // 페이지변경시 쿼리 파라미터 추가
  useEffect(() => {
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }, [page, params, router]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef?.current?.value) {
      params.set('search', inputRef.current.value);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
    setPage(1);
  };

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold mb-[20px]">뉴스기사</h2>

      <form onSubmit={handleSearch} className="flex">
        <input
          ref={inputRef}
          defaultValue={paramsObj.search}
          type="search"
          placeholder="검색어 입력"
          autoComplete="off"
          className="border border-gray-300 w-full"
        />
        <button type="submit" className="btn shrink-0">
          검색
        </button>
      </form>
      {isPending && <div>로딩중</div>}
      {isError && <div>{error.message}</div>}
      {data && data?.result?.length > 0 && (
        <ul className="space-y-[10px] my-[20px]">
          {data?.result.map((article) => (
            <li key={article.id}>
              <Link href={`/articles/${article.id}`}>
                <BoldText text={article.title} keyword={paramsObj.search} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!isPending && data?.result?.length === undefined && <p>검색결과없음</p>}
      {data && data?.result?.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
      )}
    </main>
  );
}
