import Template from '../components/Template';
import { AssemblyLawList } from '../components/AssemblyLawList';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';

//국회
export function SetAssembly({ position }) {
  return (
    <>
      <ManagerHeader />
      <Template
        isAuthPage2={true}
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
