import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/Headers';
import Template from '../components/Template';
import { useEffect, useState } from 'react';
import { SavingTeller } from '../components/SavingTeller';
import SalaryTeller from '../components/SalaryTeller';
import { AssemblyLawList } from '../components/AssemblyLawList';
import RevenueCollect from '../components/RevenueCollect';
import RatingManage from '../components/RatingManage';
import { ToastContainer } from 'react-toastify';
import { LoginBtn } from '../components/Btns';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry } from '../hooks/Functions';

export default function Skills() {
  const { id } = useParams();

  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [skillId, setSkillId] = useState();

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth);

  const showItem = () => {
    setIsShow(true);
  };

  useEffect(() => {
    if (authFunc()) {
      confirmCountry(id, userInfo, showItem);
    } else {
      setLoginBtn(true);
    }
  }, [userInfo]);

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
      <ToastContainer />
      {loginBtn && <LoginBtn />}
      {/* 컴포넌트 쓰는거라 뒤로가기 설정 해주기 */}
      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={
            <>
              {skillId == 0 && (
                <PageHeader path={`/${id}/main`}>{'월급 지급'}</PageHeader>
              )}
              {skillId == 1 && (
                <PageHeader path={`/${id}/main`}>
                  {'적금 (가입 및 해지)'}
                </PageHeader>
              )}
              {skillId == 3 && (
                <PageHeader path={`/${id}/main`}>
                  {'국세청 (세금 징수)'}
                </PageHeader>
              )}
              {skillId == 4 && (
                <PageHeader path={`/${id}/main`}>
                  {'신용등급 관리 위원회'}
                </PageHeader>
              )}
              {skillId == 5 && (
                <PageHeader path={`/${id}/main`}>{'국회 (법 제정)'}</PageHeader>
              )}
            </>
          }
          childrenBottom={
            <>
              <div className="student-wrap">
                {/*월급 */}
                {skillId == 0 && <SalaryTeller />}
              </div>

              <div className="student-wrap">
                {/* 적금 */}
                {skillId == 1 && <SavingTeller />}
              </div>

              <div className="student-wrap">
                {/* 세금 징수 */}
                {skillId == 3 && <RevenueCollect />}
              </div>

              <div className="student-wrap">
                {/* 신용 등급 관리위원회 */}
                {skillId == 4 && <RatingManage />}
              </div>

              {/* 국회 */}
              {skillId == 5 && <AssemblyLawList />}
            </>
          }
        />
      )}
    </>
  );
}
