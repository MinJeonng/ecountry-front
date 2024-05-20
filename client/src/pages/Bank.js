import { AddSavings } from '../components/BankManager';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';

export default function SetBank({ position }) {
  return (
    <>
      <Template
        childrenBottom={<>{position === '적금 상품' && <AddSavings />}</>}
      />
    </>
  );
}
