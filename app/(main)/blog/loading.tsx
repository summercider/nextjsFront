export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>현재 페이지 로딩중입니다</p>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#ba0000]"></div>
    </div>
  );
}
