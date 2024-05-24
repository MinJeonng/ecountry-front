//국민리스트
import { SetPeopleList } from '../components/PeopleList';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';
import { PageHeader } from '../components/Headers';

export default function PeopleList({ position }) {
  return (
    <>
      <Template
        childrenTop={<PageHeader>{'국민 리스트'}</PageHeader>}
        childrenBottom={<SetPeopleList />}
      />
    </>
  );
}
