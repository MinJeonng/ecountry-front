import Template from '../components/Template';

import { AssemblyLawList } from '../components/AssemblyLawList';
import { AssemblyLawEdit } from '../components/AssemblyLawEdit';

//국회
export function SetAssembly({ position }) {
  return (
    <>
      <Template
        childrenTop={<div className="top-title">국회</div>}
        childrenBottom={
          <>
            {/* 법 리스트 */}
            {position == '법 리스트' && <AssemblyLawList />}
            {/* 법 개정 및 제정 페이지 */}
            {position == '법 개정' && <AssemblyLawEdit />}
            {position == '법 제정' && <AssemblyLawEdit />}
          </>
        }
      />
    </>
  );
}
