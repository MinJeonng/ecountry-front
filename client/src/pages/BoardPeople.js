//국민신문고
import Template from '../components/Template';
import { BoardPeopleList } from '../components/BoardPeople';
import { BoardPeopleWrite } from '../components/BoardPeopleWrite';
import { BoardPeopleRead } from '../components/BoardPeopleRead';
import { PageHeader } from '../components/Headers';
import { StudentHeader } from '../components/StudentHeader';
export function SetBoardPeople({ position }) {
  return (
    <>
      <StudentHeader />
      <Template
        isAuthPage2={true}
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {position === '신문고' && <BoardPeopleList />}
            {position === '신문고 글쓰기' && <BoardPeopleWrite />}
            {position === '신문고 리스트' && <BoardPeopleRead />}
          </>
        }
      />
    </>
  );
}
