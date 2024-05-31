import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/Headers';
import Template from '../components/Template';
import { useEffect, useState } from 'react';
import { SavingTeller } from '../components/SavingTeller';
import SalaryTeller from '../components/SalaryTeller';
import { AssemblyLawList } from '../components/AssemblyLawList';
import RevenueCollect from '../components/RevenueCollect';
import RatingManage from '../components/RatingManage';

export default function Skills({ position }) {
  const [skillId, setSkillId] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedSkillId = localStorage.getItem('skillId');
    if (storedSkillId) {
      setSkillId(storedSkillId);
    }
  }, []);
  useEffect(() => {
    if (skillId) {
      // console.log(skillId);
      localStorage.removeItem('skillId');
    }
  });
  return (
    <>
      {/* 컴포넌트 쓰는거라 뒤로가기 설정 해주기 */}
      <Template
        childrenTop={<PageHeader position={position}>{position}</PageHeader>}
        childrenBottom={
          <>
            {/*월급 */}
            {skillId == 0 && <SalaryTeller position="은행원 - 월급" />}
            {/* 적금 */}
            {skillId == 1 && <SavingTeller />}
            {/* 세금 징수 */}
            {skillId == 3 && <RevenueCollect />}
            {/* 신용 등급 관리위원회 */}
            {skillId == 4 && <RatingManage position="신용등급 관리 위원회" />}
            {/* 국회 */}
            {skillId == 5 && <AssemblyLawList />}
          </>
        }
      />
    </>
  );
}
