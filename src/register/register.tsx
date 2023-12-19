import React, { Fragment } from 'react';
import Register from '../components/register/register';
import { Outlet } from 'react-router-dom';

const RegisterPage: React.FC = () => {
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
