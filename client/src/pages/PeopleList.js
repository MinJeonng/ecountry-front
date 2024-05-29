//국민리스트
import { SetPeopleList } from '../components/PeopleList';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';
import { PageHeader } from '../components/Headers';
import { useParams } from 'react-router-dom';

export default function PeopleList({ position }) {
  const { id } = useParams();
  return (
    <>
      <Template
        childrenTop={
          <PageHeader path={`/${id}/manager`}>{'국민 리스트'}</PageHeader>
        }
        childrenBottom={<SetPeopleList />}
      />
    </>
  );
}
