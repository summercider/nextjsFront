type ProductsDetailsProp = {
  params: Promise<{ productId: string }>;
};
//generateMetadata 는 동적 생성함수 이름변경 X
export async function generateMetadata({ params }: ProductsDetailsProp) {
  const { productId } = await params;

  const title = await new Promise((resolve) => {
    setTimeout(() => resolve(`번호${productId}`), 200);
  });

  return {
    title: `Product ${title}`,
  };
}

export default async function ProductsDetails({ params }: ProductsDetailsProp) {
  // params도 프로미스로 들어옴 데이터잖아
  const { productId } = await params;

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold">
        details about product : {productId}
      </h2>
    </main>
  );
}
