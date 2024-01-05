import React, { Fragment, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Login from '../components/login/login';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = checkIfLoggedIn();

  const redirectToHome = () => {
    navigate(`/`);
  };

  useEffect(() => {
    if (isLoggedIn) {
      redirectToHome();
    }
  }, [isLoggedIn]);

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
