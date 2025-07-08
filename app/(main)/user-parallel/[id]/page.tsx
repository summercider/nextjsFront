type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Album = {
  userId: number;
  id: number;
  title: string;
};

async function getUserPosts(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch mock data');
  }

  return response.json();
}

async function getUserAlbums(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch mock data');
  }

  // 프라미스 리턴
  return response.json();
}
export default async function UserParallel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postsData = getUserPosts(id);
  const albumsData = getUserAlbums(id);

  // 프라미스 해제
  const [posts, albums] = await Promise.all([postsData, albumsData]);

  return (
    <main className="p-[20px]">
      <div className="grid grid-cols-2 gap-x-[20px]">
        <ul className="space-y-[15px]">
          {posts.map((post: Post) => (
            <li key={post.id} className="bg-[#eee] p-[15px] rounded-[8px]">
              <strong className="font-bold">{post.title}</strong>
            </li>
          ))}
        </ul>
        <ul className="space-y-[15px]">
          {albums.map((album: Album) => (
            <li key={album.id} className="bg-[#eee] p-[15px] rounded-[8px]">
              <strong className="font-bold">{album.title}</strong>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
