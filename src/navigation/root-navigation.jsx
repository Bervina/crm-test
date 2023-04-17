import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';
import { BrowserRouter } from 'react-router-dom';

import MainStack from './mainStack/mainStack';
import AuthStack from './authStack/AuthStack';

const RootNavigation = () => {
  const [authUser, setAuthUser] = useState();

  const getSubscribe = useCallback(() => {
    auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });
  }, []);

  useEffect(() => {
    getSubscribe();
  }, [getSubscribe]);

  const stack = useMemo(() => {
    if (authUser === undefined) {
      return null;
    }
    if (authUser) {
      return <MainStack />;
    }
    return <AuthStack />;
  }, [authUser]);

  return <BrowserRouter>{stack}</BrowserRouter>;
};

export default memo(RootNavigation);
