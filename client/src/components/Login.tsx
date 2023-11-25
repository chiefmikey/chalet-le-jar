import { useLogto, UserInfoResponse } from '@logto/react';
import React, { useEffect, useState } from 'react';

import Content from './Content';

const Login = ({ updatePath }: { updatePath: (path: string) => void }) => {
  const { signIn, isAuthenticated, fetchUserInfo } = useLogto();

  const [user, setUser] = useState('');

  const isLocal = window.location.hostname === 'localhost';
  const redirect = isLocal
    ? 'http://localhost/login'
    : 'https://chaletlejar.com/login';
  const path = window.location.pathname;
  const sessionUser = sessionStorage.getItem('user') || '';

  const getUser = async () => {
    return await fetchUserInfo();
  };

  const handleUser = (user: UserInfoResponse | undefined) => {
    const username = user?.username ? user.username.replaceAll('_', ' ') : '';
    sessionStorage.setItem('user', username);
    setUser(username);
  };

  useEffect(() => {
    if (sessionUser) {
      if (user !== sessionUser) {
        setUser(sessionUser);
      }
    } else if (isAuthenticated) {
      getUser()
        .then((user: UserInfoResponse | undefined) => {
          handleUser(user);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    } else {
      updatePath(path);
      signIn(redirect).catch((error) => {
        console.error('Error signing in:', error);
      });
    }
  }, [isAuthenticated, sessionUser, user]);

  const setComponent = (hasUser: boolean) => {
    if (hasUser) {
      return <Content username={sessionUser} />;
    }

    return <></>;
  };

  return setComponent(!!sessionUser);
};

export default Login;
