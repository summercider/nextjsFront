import { http, HttpResponse } from 'msw';
import articles from './articles.json';

let maxId = Math.max(...articles.map((item) => item.id));

export const articlesHandlers = [
  http.get('http://localhost:9090/articles', async ({ request }) => {
    await sleep(200);

    // msw의 request객체에 serachParams가 없어서 JS의 URL객체로 만듬
    const url = new URL(request.url);
    //만들어서 url객체의 searchParams메서드.get 사용
    const search = url.searchParams.get('search');
    //parseInt는 문자열만 number로 다른타입일경우 NAN반환하므로 number씀
    const page = Number(url.searchParams.get('page'));

    // 페이지별 데이터 가져오기
    function getDataByPage(
      data: { id: number; title: string; content: string }[],
      page: number,
      limit: number
    ) {
      const totalPages = Math.ceil(data.length / limit);
      //
      if (page < 1 || page > totalPages) {
        return [];
      }
      //
      // slice 위치 slice(start,end)
      const start = (page - 1) * limit;
      const end = start + limit;
      //
      return {
        result: data.slice(start, end),
        total: data.length,
      };
    }

    // search 결과 탐색
    // 검색 결과 데이터 filter
    // search없을 경우 'undefined' 문자로 들어옴
    // search 있을 경우 제목중 검색어 포함된 데이터만 필터링
    if (search !== 'undefined' && search) {
      console.log('?', search);
      const filterd = articles.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      const result = getDataByPage(filterd, page, 5);

      return HttpResponse.json(result);
    }

    // search 없을 경우 전체 데이터에서 page에 맞는 데이터만 가져옴
    const result = getDataByPage(articles, page, 5);

    return HttpResponse.json(result);
  }),
  // id 탐색
  http.get('http://localhost:9090/articles/:id', async ({ params }) => {
    await sleep(200);
    const { id } = params;
    //find 배열요소 1개만
    const article = articles.find((item) => item.id === Number(id));
    return HttpResponse.json(article);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
