import React from 'react';
import { SettingHeader } from './SettingHeader';
import '../styles/settingHeader.scss';

export function HeaderTempl({ position, childrenTop, childrenBottom }) {
  return (
    <>
      <SettingHeader position={position} />
      {childrenTop}
      {childrenBottom}
    </>
  );
}
