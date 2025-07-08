'use client';
//클라이언트 컴포넌트는 그냥 usequery쓰면댐

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
  country: string;
  lang: string;
};

type User2 = Partial<User>;

export default function Child() {
  const queryClient = useQueryClient();
  // console.log('클라이언트컴포넌트');

  //react hook사용시 동적추가되는 데이터에 대한 타입을 지정해야함 <제너릭으로>
  const { isPending, data, isError, error } = useQuery<User[]>({
    queryKey: ['user'],
    queryFn: () => {
      return fetch('http://localhost:9090/user').then((res) => res.json());
    },
  });

  // console.log(data);

  const { mutate } = useMutation({
    mutationFn: (user: Partial<User>) => {
      return fetch('http://localhost:9090/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('제출');

    // e.target의 타입 정의
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const user = Object.fromEntries(formData.entries());
    // console.log(user);

    if (user.name && user.country && user.lang) {
      mutate(user);
    }
  };

  return (
    <div>
      <h2 className="text-[30px]">클라이언트 컴포넌트</h2>
      <form className="space-y-[10px]" onSubmit={handleAddUser}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="이름"
            autoComplete="off"
            className="w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="country"
            placeholder="국가"
            autoComplete="off"
            className="w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="lang"
            placeholder="언어"
            autoComplete="off"
            className="w-full"
          />
        </div>
        <button type="submit" className="btn">
          유저추가
        </button>
      </form>

      {isPending && <p>로딩중 .................</p>}
      {isError && <p>못불러옴</p>}
      {data && data?.length > 0 && (
        <ul className="spacet-y-[5px] mt-[15px]">
          {data.map((user) => (
            <li key={user.id} className="flex gap-x-[10px]">
              <p>id: {user.id}</p>
              <p>이름: {user.name}</p>
              <p>국가: {user.country}</p>
              <p>기술스택: {user.lang}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
