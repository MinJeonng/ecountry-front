//뉴스

import Template from '../components/Template';
import { SetPostWrite } from '../components/PostWrite';
import { SetNewsDetail } from '../components/NewsDetail';
import { SetNewsRead } from '../components/NewsRead';
import { Practice } from '../components/Write_ex';
import { PageHeader } from '../components/Headers';

export function SetNews({ position }) {
  return (
    <>
      <Template
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {/* 뉴스 리스트 */}
            {position == '뉴스 리스트' && <SetNewsDetail />}
            {/* 뉴스 작성 페이지 */}
            {position === '뉴스 글쓰기' && (
              <SetPostWrite
                placeholder={'뉴스 내용을 입력해주세요'}
                value={undefined}
              />
              // <Practice />
            )}
            {/* Read 읽기 header는 구현된거 보고 다시 확인 */}
            {position === '읽기' && <SetNewsRead />}
          </>
        }
      />
    </>
  );
}
