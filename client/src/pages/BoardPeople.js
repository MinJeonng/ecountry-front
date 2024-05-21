//국민신문고
import Template from '../components/Template';
import { BoardPeopleList } from '../components/BoardPeople';
import { BoardPeopleWrite } from '../components/BoardPeopleWrite';
import { BoardPeopleRead } from '../components/BoardPeopleRead';
import { useNavigate, useParams } from 'react-router-dom';
export function SetBoardPeople({ position }) {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Template
        childrenTop={
          <>
            {position === '리스트' && (
              <>
                <div
                  // 메인페이지가 아직 없어서 안 넣어놓음..
                  // onClick={()=>navigate(``)}
                  style={{
                    position: 'absolute',
                    top: '90px',
                    left: '30px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-back.png`}
                    style={{ width: '22%' }}
                  ></img>
                  <div style={{ fontSize: '17px' }}>메인페이지</div>
                </div>
              </>
            )}
            {position === '읽기' && (
              <>
                <div
                  onClick={() => navigate(`/${id}/boardPeople`)}
                  style={{
                    position: 'absolute',
                    top: '90px',
                    left: '30px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-back.png`}
                    style={{ width: '22%' }}
                  ></img>
                  <div style={{ fontSize: '17px' }}>리스트</div>
                </div>
              </>
            )}
            {position === '작성' && (
              <>
                <div
                  onClick={() => navigate(`/${id}/boardPeople`)}
                  style={{
                    position: 'absolute',
                    top: '90px',
                    left: '30px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-back.png`}
                    style={{ width: '22%' }}
                  ></img>
                  <div style={{ fontSize: '17px' }}>리스트</div>
                </div>
              </>
            )}
          </>
        }
        childrenBottom={
          <>
            {position === '리스트' && <BoardPeopleList />}
            {position === '작성' && <BoardPeopleWrite />}
            {position === '읽기' && <BoardPeopleRead />}
          </>
        }
      />
    </>
  );
}
