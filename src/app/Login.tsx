import { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import Login from '../components/login/login';

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(`/`);
  };

  const { isLoggedIn } = checkIfLoggedIn();

  useEffect(() => {
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
