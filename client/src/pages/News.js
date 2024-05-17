//뉴스

import Template from '../components/Template';
import { SetNewsWrite } from '../components/NewsWrite';
import { SetNewsDetail } from '../components/NewsDetail';
import { SetNewsRead } from '../components/NewsRead';

export function SetNews({ position }) {
  return (
    <>
      <Template
        childrenBottom={
          <>
            {/* 뉴스 리스트 */}
            {position == '리스트' && <SetNewsDetail />}
            {/* 뉴스 작성 페이지 */}
            {position === '작성' && <SetNewsWrite />}
            {position === '읽기' && <SetNewsRead />}
          </>
        }
      />
    </>
  );
}
