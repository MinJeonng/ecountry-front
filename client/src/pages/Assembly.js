import Template from '../components/Template';
import { AssemblyLawList } from '../components/AssemblyLawList';
import { PageHeader } from '../components/Headers';

//국회
export function SetAssembly({ position }) {
  return (
    <>
      <Template
        childrenTop={<PageHeader>{position}</PageHeader>}
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
