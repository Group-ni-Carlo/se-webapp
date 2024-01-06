import React, { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import Register from '../components/Register/Register';

const RegisterPage: React.FC = () => {
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
        <Register />
      </div>
      <Outlet />
    </Fragment>
  );
};

export default RegisterPage;
