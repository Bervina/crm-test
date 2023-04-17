import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase';
import style from './SignIn.module.scss';
import imgGoogle from './google.svg';
import { NavLink } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => console.log(error));
    setEmail('');
    setPassword('');
  };

  const signInPopup = (e) => {
    signInWithPopup(auth, googleAuthProvider)
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
    console.log(auth);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={style.sign}>
      <div className={style.blockSignIn}>
        <form onSubmit={signIn} className={style.formSignIn}>
          <h1>SignIn</h1>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={style.input}
          />
          Password:
          <input
            className={style.input}
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className={style.buttonSignIn} type="submit">
            SignIn
          </button>
        </form>
        <NavLink className={style.mainText} to={'/createAccount'}>
          Create Account
        </NavLink>
        <button className={style.buttonSignInGoogle} onClick={signInPopup}>
          <img className={style.imgGoogle} src={imgGoogle} alt="SignInGoogle" />
        </button>
      </div>
    </div>
  );
};

export default SignIn;
