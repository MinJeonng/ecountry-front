import React from 'react';

import '../styles/background.scss';



export default function Background(props) {

  return (
    <div className="wrap">
      <div className="bgTop">{props.title}</div>
      <div className="bgBottom">{props.main}</div>
    </div>
  );
}
