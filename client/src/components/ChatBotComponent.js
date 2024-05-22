import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as IconHome } from '../images/icon-home.svg';
import styled from 'styled-components';

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;
  .headerLeft {
    display: flex;
    align-items: center;
    .chatbotTit {
      margin-left: 4px;
    }
  }
`;
export function ChatBotHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <HeaderStyle>
        <div className="headerLeft">
          <ArrowLeft stroke="#ddd" onClick={() => navigate(-1)} />
          <div className="chatbotTit">챗봇</div>
        </div>
        {/* 홈버튼 클릭 시 국가 메인페이지로 이동 되도록 수정 */}
        <IconHome stroke="#ddd" onClick={() => navigate(`/${id}/manager`)} />
      </HeaderStyle>
    </>
  );
}
