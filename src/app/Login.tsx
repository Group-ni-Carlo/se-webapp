import React, { Fragment } from 'react';
import Login from '../components/login/login';
import { Outlet } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <Fragment>
      <div>
        <Login />
      </div>
      <Outlet />
    </Fragment>
  );
};

export default LoginPage;
