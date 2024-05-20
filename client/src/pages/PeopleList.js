//국민리스트
import { SetPeopleList } from '../components/PeopleList';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';

export default function PeopleList({ position }) {
  return (
    <>
      <Template childrenBottom={<SetPeopleList />} />
    </>
  );
}
