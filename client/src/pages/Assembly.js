import Template from '../components/Template';
import { AssemblyLawList } from '../components/AssemblyLawList';

//국회
export function SetAssembly({ position }) {
  return (
    <>
      <Template
        childrenTop={<div className="top-title">국회</div>}
        childrenBottom={
          <>
            {/* 법 리스트 */}
            {position == '국회' && <AssemblyLawList />}
          </>
        }
      />
    </>
  );
}
