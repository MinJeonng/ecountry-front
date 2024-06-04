import { useNavigate, useParams } from 'react-router-dom';

import '../styles/studentMypage.scss';

import Template from '../components/Template';
import { StudentIdCard } from '../components/StudentIdCard';
import { PageHeader } from '../components/Headers';
import { StudentPayStub } from './StudentPayStub';
import { StudentHeader } from '../components/StudentHeader';

export default function StudentMyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate(`/${id}/changePw`);
  };

  return (
    <>
      <StudentHeader />
      <Template
        isAuthPage2={true}
        childrenTop={<PageHeader>{'마이페이지'}</PageHeader>}
        childrenBottom={
          <>
            <button
              className="changePassword-btn"
              onClick={handleChangePassword}
            >
              비밀번호 변경
            </button>

            <StudentIdCard />
            <StudentPayStub />
          </>
        }
      />
    </>
  );
}
