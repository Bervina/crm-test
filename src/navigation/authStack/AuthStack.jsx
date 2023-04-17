import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../../components/LoginPage/SignIn';
import { Navigate } from 'react-router';

import CreateAccount from '../../components/LoginPage/CreateAccount';

const AuthStack = () => (
  <Routes>
    <Route path={'/'} element={<SignIn />} />
    <Route path={'/createAccount'} element={<CreateAccount />} />
    <Route path={'*'} element={<Navigate replace to="/" />} />
  </Routes>
);

export default memo(AuthStack);
