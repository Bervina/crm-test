import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../components/HomePage/HomePage';
import Profile from '../../components/Profile/Profile';
import Travel from '../../components/Travel/Travel';
import Admin from '../../components/AdminPage/Admin';
import { Navigate } from 'react-router';
import Layout from '../../components/layout/layout';

const MainStack = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/travel'} element={<Travel />} />
        <Route path={'/admin'} element={<Admin />} />
        <Route path={'*'} element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
};

export default memo(MainStack);
