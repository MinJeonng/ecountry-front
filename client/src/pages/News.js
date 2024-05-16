//뉴스

import { SetNewsWrite } from '../components/NewsWrite';
import { SetNewsDetail } from '../components/NewsDetail';
import Template from '../components/Template';

export function SetNews({ position }) {
  return (
    <>
      <Template
        childrenBottom={
          <>
            {/* 뉴스 리스트 */}
            {position == '리스트' && <SetNewsDetail />}
            {/* <SetNewsList /> */}
            {/* 뉴스 작성 페이지 */}
            {position === '작성' && <SetNewsWrite />}
            {/* <SetNewsDetail /> */}
          </>
        }
      />
    </>
  );
}
