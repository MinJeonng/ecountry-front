import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../store/userInfoReducer';
import useAuth from '../hooks/useAuth';
import useConfirm from '../hooks/useConfirm';

export default function Test() {
  const [userAuth, setUserAuth] = useConfirm();
  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {}, [userAuth]);

  useEffect(() => {
    setUserAuth();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}
