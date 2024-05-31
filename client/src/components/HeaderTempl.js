import React from 'react';
import { PcHeader } from './PcHeader';
import '../styles/pcHeader.scss';

export function HeaderTempl({ position, childrenTop, childrenBottom }) {
  return (
    <>
      <PcHeader position={position} />
      {childrenTop}
      {childrenBottom}
    </>
  );
}
