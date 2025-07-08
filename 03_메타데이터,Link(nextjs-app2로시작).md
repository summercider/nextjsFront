# 메타데이터

- (main) 라우터 그룹 삭제

![](images/2.png)

- 루트 레이아웃의 메타데이터 객체가 모든 페이지에 적용됨

```js
// app/layout.tsx
// 인터페이스, 타입은 type키워드 사용 권장
import type { Metadata } from 'next';
import './globals.css';
import TanStackProvider from '@/providers/TanStackProvider';
import { pretendard } from '@/app/ui/fonts';
import Header from '@/app/ui/home/Header';
import Footer from '@/app/ui/home/Footer';

export const metadata: Metadata = {
  title: '네이버',
  description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요.',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Header />
        <TanStackProvider>{children}</TanStackProvider>
        <Footer />
      </body>
    </html>
  );
}
```

## 서브 페이지 메타 데이터 변경

- 지정된 변수명만 사용가능

- 메타데이터 변경은 서버컴포넌트에서만 가능

```js
// app/about/page.tsx
export const metadata = {
  title: 'About | 네이버',
};

export default function About() {
  return <h2>About me</h2>;
}
```

## 동적 메타데이터

- 지정된 함수명만 사용가능

```js
// 동일 타입을 두군데 이상 사용시 타입을 따로 정의하여 사용
type ProductDetailsProps = {
  params: Promise<{ productId: string }>;
};

// 함수의 리턴타입은 대부분 자동으로 추론되므로 생략
export async function generateMetadata({ params }: ProductDetailsProps) {
  // params는 Promise로 정의되어 있으므로 await를 사용하여 값을 가져옴
  const { productId } = await params;

  // api를 통해 productId에 대한 제품 상세 정보 사용가능
  // api가 없으므로 프라미스로 대체
  const title = await new Promise((resolve) => {
    setTimeout(() => resolve(`갤럭시 ${productId}`), 200);
  });

  return {
    title: `Product ${title}`,
  };
}

// params는 제네릭 프라미스 타입으로 정의
// 서버컴포넌트 본체에 async, await 사용 가능
export default async function ProductDetails({ params }: ProductDetailsProps) {
  // params는 Promise로 정의되어 있으므로 await를 사용하여 값을 가져옴
  const { productId } = await params;

  return <h2>details about product {productId}</h2>;
}
roduct {productId}</h2>;
}
```

## 타이틀 메타데이터

```js
// app/layout.tsx
// 인터페이스, 타입은 type키워드 사용 권장
import type { Metadata } from 'next';
import './globals.css';
import TanStackProvider from '@/providers/TanStackProvider';
import { pretendard } from '@/app/ui/fonts';
import Header from '@/app/ui/home/Header';
import Footer from '@/app/ui/home/Footer';

export const metadata: Metadata = {
  title: {
    default: '네이버',
    // %s는 형식문자이며 서브페이지 타이틀이 들어감
    template: '%s | 네이버',
  },
  description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요.',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Header />
        <TanStackProvider>{children}</TanStackProvider>
        <Footer />
      </body>
    </html>
  );
}
```

```js
// app/about/page.tsx
export const metadata = {
  title: 'About',
};

export default function About() {
  return <h2>About me</h2>;
}
```

# Link 컴포넌트

```js
// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h2>Welcome home!</h2>
      <Link href="/blog">blog</Link>
      <Link href="/products">products</Link>
    </main>
  );
}
```

```js
// app/products/page.tsx
import Link from 'next/link';

export default function Products() {
  const productId = 100;

  return (
    <main>
      <Link href="/">home</Link>
      <h2>products</h2>
      <ul>
        <li>
          <Link href="/products/1">product 1</Link>
        </li>
        <li>
          <Link href="/products/2">product 2</Link>
        </li>
        <li>
          {/* replace 사용시 현재페이지가 히스토리에 추가되지않음 */}
          <Link href="/products/3" replace>
            product 3
          </Link>
        </li>
        <li>
          <Link href={`/products/${productId}`}>product {productId}</Link>
        </li>
      </ul>
    </main>
  );
}
```

## Active Link

```js
// app/(auth)/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
  { href: '/forgot-password', label: 'Forgot password' },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <ul className="flex gap-[10px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? 'text-point1' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
```
