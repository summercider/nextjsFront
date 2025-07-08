'use client';

import React, { useState } from 'react';

export default function Dashboard() {
  // state사용하려면 use clident 선언!
  const [name, setName] = useState<string>('');
  console.log('클라이언트 컴포넌트');

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold">대시보드</h2>
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <p>Hello,{name}</p>
    </main>
  );
}
