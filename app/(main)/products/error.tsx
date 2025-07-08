'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const route = useRouter();

  const reload = () => {
    startTransition(() => {
      route.refresh(); //새로고침
      reset(); //에러상태초기화
    });
  };

  return (
    <div>
      {error.message}
      <p>새로고침 누르셈</p>
      <button type="button" className="btn" onClick={reload}>
        새로고침
      </button>
    </div>
  );
}
