import { Montserrat, Lusitana } from 'next/font/google';
import localFont from 'next/font/local';

//변수형폰트
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const pretendard = localFont({
  //상대경로만 사용
  src: [
    { path: '../../public/fonts/Pretendard-Regular.woff', weight: '400' },
    { path: '../../public/fonts/Pretendard-Medium.woff', weight: '500' },
    { path: '../../public/fonts/Pretendard-Bold.woff', weight: '700' },
  ],
  display: 'swap',
});
