'use client';
import { useRouter } from 'next/navigation';

export default function ProductOrder() {
  const route = useRouter();
  const handleOrder = () => {
    // 조건없이 이동
    route.push('/');
  };

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold">제품 주문</h2>
      <button type="button" onClick={handleOrder}>
        주문하기
      </button>
    </main>
  );
}
