import { useHandleSignInCallback, useLogto } from '@logto/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ path, isLogin }: { path: string; isLogin: boolean }) => {
  const navigate = useNavigate();
  const { signOut } = useLogto();
  let domain = window.location.hostname;
  domain = domain === 'localhost' ? 'localhost' : `${domain}.com`;

  const { protocol } = window.location;
  if (!isLogin) {
    signOut(`${protocol}//${domain}`).catch((error: Error) => {
      console.error('Error signing out:', error);
    });
  }

  useHandleSignInCallback(() => {
    if (isLogin) {
      navigate(path);
    }
  });

  return <></>;
};

export default Auth;
