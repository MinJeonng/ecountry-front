//뉴스
import { SetNewsList } from '../components/NewsList';
import { SetNewsDetail } from '../components/NewsDetail';
import Template from '../components/Template';

export function SetNews() {
  return (
    <>
      <Template
        childrenBottom={
          <>
            {/* 뉴스 리스트 */}
            <SetNewsList />
            {/* 뉴스 작성 페이지 */}
            <SetNewsDetail />
          </>
        }
      />
    </>
  );
}
