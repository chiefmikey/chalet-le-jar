import { useLogto, UserInfoResponse } from '@logto/react';
import React, { useEffect, useState } from 'react';

import Content from './Content';

const Login = ({ updatePath }: { updatePath: (path: string) => void }) => {
  const { signIn, isAuthenticated, fetchUserInfo } = useLogto();
  const isLocal = window.location.hostname === 'localhost';
  const [user, setUser] = useState({} as UserInfoResponse | undefined);
  const redirect = isLocal
    ? 'http://localhost:8080/login'
    : 'https://chaletlejar.com/login';
  const path = window.location.pathname;
  const getUser = async () => {
    return await fetchUserInfo();
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser()
        .then((user: UserInfoResponse | undefined) => {
          setUser(user);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    } else {
      updatePath(path);
      signIn(redirect);
    }
  }, [isAuthenticated]);

  const setComponent = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      return <Content user={user} />;
    }

    return <></>;
  };

  return setComponent(isAuthenticated);
};

export default Login;
