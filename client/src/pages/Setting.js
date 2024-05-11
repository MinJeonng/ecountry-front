import React from 'react';
import Background from '../components/Background';

import '../styles/background.scss';

import {
  Setting1,
  Setting2,
  Setting3,
  Setting4,
  Setting5,
  Setting6,
} from '../components/Setting';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';


export default function Setting() {
  return (
    <>
      <Background />
      {/* {position === '설정1' && <Setting1 />}
      {position === '설정2' && <Setting2 />}
      {position === '설정3' && <Setting3 />}
      {position === '설정4' && <Setting4 />}
      {position === '설정5' && <Setting5 />}
      {position === '설정6' && <Setting6 />} */}
    </>
  );
}
