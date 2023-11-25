import { useHandleSignInCallback, useLogto } from '@logto/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { handleSignOut } from './helpers/authHelper';

const Auth = ({ path, isLogin }: { path: string; isLogin: boolean }) => {
  const navigate = useNavigate();
  const { signOut } = useLogto();

  if (!isLogin) {
    handleSignOut(signOut);
  }

  useHandleSignInCallback(() => {
    if (isLogin) {
      navigate(path);
    }
  });

  return <></>;
};

export default Auth;
