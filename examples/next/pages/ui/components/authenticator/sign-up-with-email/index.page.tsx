import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function AuthenticatorWithEmail() {
  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
  };

  return (
    <Authenticator services={services} initialState="signUp">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
