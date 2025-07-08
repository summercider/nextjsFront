import '../globals.css';
import Header from '@/app/ui/home/Header';
import Footer from '@/app/ui/home/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <p className="bg-red-200">
        main 공통레이아웃 아래는 자식프롭으로 페이지들 보여주지
      </p>
      {children}
      <p className="bg-red-200">
        main 공통레이아웃 위는 자식프롭으로 페이지들 보여주지
      </p>
      <Footer />
    </div>
  );
}
