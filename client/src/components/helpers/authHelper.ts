import { Optional } from '@silverhand/essentials';

export const handleSignOut = (
  signOut: (
    postLogoutRedirectUri?: string | undefined,
  ) => Promise<Optional<void>>,
) => {
  const { protocol, hostname } = window.location;
  let domain = hostname;
  domain = domain === 'localhost' ? 'localhost' : `${domain}`;

  sessionStorage.clear();

  signOut(`${protocol}//${domain}`).catch((error: Error) => {
    console.error('Error signing out:', error);
  });
};
