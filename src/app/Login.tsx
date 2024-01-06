import React, { Fragment, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import Login from '../components/login/Login';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [logStatus, setLogStatus] = useState(false);

  const redirectToHome = () => {
    navigate(`/`);
  };

  const { isLoggedIn } = checkIfLoggedIn();

  useEffect(() => {
    setLogStatus(isLoggedIn);

    setTimeout(() => {
      if (isLoggedIn) {
        redirectToHome();
      }
    }, 2000);
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
