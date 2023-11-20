// list select and execute like all others. list provides dev options for start stop refresh upgrade, maybe with input for manual version change.

import { useLogto } from '@logto/react';
import React from 'react';
// sign out button
const SignOut = () => {
  const { signOut } = useLogto();

  return (
    <button onClick={() => signOut('http://localhost:3000')}>Sign out</button>
  );
};
