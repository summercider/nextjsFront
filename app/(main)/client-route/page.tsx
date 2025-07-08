'use client';

import { useTheme, useFn } from '@/app/ui/ThemeProvider';

export default function ClientRoute() {
  const theme = useTheme();
  const testFn = useFn();

  testFn();

  return (
    <main className="p-[30px]">
      <h2
        className="text-[26px] font-bold"
        style={{ color: theme.colors.primary }}
      >
        클라이언트 페이지
      </h2>
    </main>
  );
}
