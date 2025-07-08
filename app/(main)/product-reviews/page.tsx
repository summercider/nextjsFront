import Product from '@/app/ui/product-reviews/Product';
import Reviews from '@/app/ui/product-reviews/Reviews';
import { Suspense } from 'react';

export default function ProductReviews() {
  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold mb-[20px]">product reviews</h2>
      <Suspense fallback={<p>로딩중................ Proudct</p>}>
        <Product />
      </Suspense>
      <Suspense fallback={<p>로딩중................ Reviews</p>}>
        <Reviews />
      </Suspense>
    </main>
  );
}
