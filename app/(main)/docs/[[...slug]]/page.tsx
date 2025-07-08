export default async function Docs({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  // console.log(slug);

  if (slug?.length === 2) {
    return (
      <main className="p-[30px]">
        <h2 className="text-[26px] font-bold">
          첫번째 경로 : {decodeURIComponent(slug[0])}
          <br />
          두번째 경로 : {decodeURIComponent(slug[1])}
        </h2>
      </main>
    );
  } else if (slug?.length === 1) {
    return (
      <main className="p-[30px]">
        <h2 className="text-[26px] font-bold">
          첫번째 경로 : {decodeURIComponent(slug[0])}
        </h2>
      </main>
    );
  }

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold">DOC페이지</h2>
    </main>
  );
}
