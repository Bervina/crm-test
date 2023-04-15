import React, { useState } from 'react';
import 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import style from './CreateAccount.module.scss'
import { NavLink } from 'react-router-dom';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
      })
      .catch(error => console.log(error));
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={style.createAccount}>
      <div className={style.blockCreateAccount}>
      <form className={style.formCreateAccount} onSubmit={createAccount}>
        <h1>Create Account</h1>
        Email:
        <input type="email" value={email} onChange={handleEmailChange}/>


        Password:
        <input type="password" value={password} onChange={handlePasswordChange}/>

        <button className={style.buttonCreateAccount} type="submit">Create Account</button>
      </form>
        <NavLink to={'/'}>SignIn</NavLink>
      </div>
    </div>
  );
};

export default CreateAccount;
