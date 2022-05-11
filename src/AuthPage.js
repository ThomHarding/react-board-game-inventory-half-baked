import { useState } from 'react';
import { signIn, signUp, getUser } from './services/fetch-utils.js';

export default function AuthPage({ setEmail, setToken }) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  // you'll need to track the form state of the email and password for sign in, and separate state for sign up

  async function handleSignIn(e) {
    e.preventDefault();
    await signIn(signInEmail, signInPassword);
    // sign the user in using the form state

    const { 
      access_token, 
      user: { 
        email,
      } 
    } = getUser();

    setEmail(email);
    setToken(access_token);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
  }
    
  async function handleSignUp(e) {
    e.preventDefault();
    await signUp(signUpEmail, signUpPassword);
    // sign the user up using the form state

    const { 
      access_token, 
      user: { 
        email,
      } 
    } = getUser();

    setEmail(email);
    setToken(access_token);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
  }

  return (
    <div className='auth'>
      <h1><em>Boardzo</em></h1>
      {/* on submit, sign the user up using the function defined above */}
      <form onSubmit={handleSignUp}>
        <label>
            Email
          {/* on change, update the form state for email */}
          <input onChange={e => setSignUpEmail(e.target.value)} required type="email" name="email" />
        </label>
        <label>
            Password
          {/* on change, update the form state for password */}
          <input onChange={e => setSignUpPassword(e.target.value)}required type="password" name="password" />
        </label>
        <button>Sign Up</button>
      </form>
      {/* on submit, sign the user in using the function defined above */}
      <form onSubmit={handleSignIn}>
        <label>
            Email
          {/* on change, update the form state for email */}
          <input onChange={e => setSignInEmail(e.target.value)}required type="email" name="email" />
        </label>
        <label>
            Password
          {/* on change, update the form state for password */}
          <input onChange={e => setSignInPassword(e.target.value)} required type="password" name="password" />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
}
