'use client';

import { useState } from 'react';
// import ServerOne from '@/app/ui/interleaving/ServerOne';

export default function ClientOne({}: { children: React.ReactNode }) {
  const [name] = useState('GOOOOODLUUUUUCK');
  return (
    <div className="bg-green-200 p-[20px]">
      <h2>ClientOne {name}</h2>

      {/* Module not found: Can't resolve 'fs/promises' */}
      {/* <ServerOne /> */}
    </div>
  );
}
