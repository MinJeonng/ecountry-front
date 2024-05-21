//국민신문고
import Template from '../components/Template';
import { BoardPeopleList } from '../components/BoardPeople';
import { BoardPeopleWrite } from '../components/BoardPeopleWrite';
import { BoardPeopleRead } from '../components/BoardPeopleRead';
export function SetBoardPeople({ position }) {
  return (
    <>
      <Template
        childrenTop={
          <>
            {position === '리스트' && (
              <>
                <div
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
                  <div style={{ fontSize: '17px' }}> 신문고</div>
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
