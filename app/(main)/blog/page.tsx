export default async function Blog() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); //settimeout 강제지연

  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold">my Blog</h2>
    </main>
  );
}
