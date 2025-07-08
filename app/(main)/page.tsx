import { formatDate } from '@/app/_lib/utils';
import Child from '@/app/ui/home/Child';
import Link from 'next/link';

export default function Home() {
  const now = formatDate(new Date());

  return (
    <main className="p-[30px] flex flex-col">
      <h2 className="text-[26px] font-bold">홈페이지 {now}</h2>
      <Link href="/blog">blog</Link>
      <Link href="/products">products</Link>
      <Link href="/articles/breaking-news-123?">read in korean</Link>
      <Link href="/articles/breaking-news-123?lang=en">read in english</Link>
      <Link href="/articles/breaking-news-123?lang=fr">read in franch</Link>
      <Child />
      {/*  /경로파라미터 ?서치파라미터 */}
    </main>
  );
}
