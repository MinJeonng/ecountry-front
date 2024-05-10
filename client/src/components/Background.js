import React from 'react';
import InputContainer from './InputContainer';
import '../styles/background.scss';

import Setting1 from './Setting1';


export default function Background(props) {
  return (
    <div className="wrap">
      <div className="bgTop"></div>
      <div className="bgBottom">
        <Setting1 />
      </div>
    </div>
  );
}
