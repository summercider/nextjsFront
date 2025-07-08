'use client';
//params는 page.tsx만 사용가능하므로 usePathname 이용
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  // console.log(pathname);
  const productId = pathname.split('/')[2];
  const reviewId = pathname.split('/')[4];
  console.log(pathname.split('/'));

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <h2 className="text-[100px] font-bold ">NO REVIEW</h2>
      <p>
        {productId}번 상품에 대한 <br />
        {reviewId}번 리뷰를 찾을수 없습니다.
      </p>
    </main>
  );
}
