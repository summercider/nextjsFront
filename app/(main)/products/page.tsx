import Link from 'next/link';

export default function Products() {
  const productId = 100;

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold">products</h2>
      <ul>
        <li>
          <Link href="/products/1">products 1</Link>
        </li>
        <li>
          <Link href="/products/2">products 2</Link>
        </li>
        <li>
          <Link href="/products/3" replace>
            products 3
          </Link>
        </li>

        <li>
          <Link href={`products/${productId}`}>product : {productId}</Link>
        </li>
      </ul>
    </main>
  );
}
