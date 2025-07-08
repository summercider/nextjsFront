'use client';

import { createContext, useContext } from 'react';

const defaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#ddd',
  },
};

function defaultFn() {
  console.log('컨텍스트 함수실행');
}

const ThemeContext = createContext(defaultTheme);
const Fncontext = createContext(defaultFn);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fncontext.Provider value={defaultFn}>
      <ThemeContext.Provider value={defaultTheme}>
        {children}
      </ThemeContext.Provider>
    </Fncontext.Provider>
  );
}

// 다른곳에서 useContext를 선언하지않고 useTheme() 함수를 사용
export function useTheme() {
  return useContext(ThemeContext);
}
export function useFn() {
  return useContext(Fncontext);
}
