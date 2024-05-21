//뉴스

import Template from '../components/Template';
import { SetPostWrite } from '../components/PostWrite';
import { SetNewsDetail } from '../components/NewsDetail';
import { SetNewsRead } from '../components/NewsRead';
import { Practice } from '../components/Write_ex';

export function SetNews({ position }) {
  return (
    <>
      <Template
        childrenBottom={
          <>
            {/* 뉴스 리스트 */}
            {position == '리스트' && <SetNewsDetail />}
            {/* 뉴스 작성 페이지 */}
            {position === '작성' && (
              <SetPostWrite
                placeholder={'뉴스 내용을 입력해주세요'}
                value={undefined}
              />
              // <Practice />
            )}
            {position === '읽기' && <SetNewsRead />}
          </>
        }
      />
    </>
  );
}
