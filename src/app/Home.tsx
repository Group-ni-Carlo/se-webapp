import { Fragment, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import '../index.css';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import checkIfAdmin from '../components/auth/checkIfAdmin';

export interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
}

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserProps>({
    id: 0,
    firstName: 'Menu',
    lastName: '',
    type: ''
  });
  const [adminStatus, setAdminStatus] = useState(false);
  const [logStatus, setLogStatus] = useState(false);

  const { user, isLoggedIn } = checkIfLoggedIn();
  const { isAdmin } = checkIfAdmin();

  useEffect(() => {
    setAdminStatus(isAdmin);
    setLogStatus(isLoggedIn);
    if (user) {
      setCurrentUser({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        type: user.type
      });
    }
  }, [isLoggedIn, isAdmin]);

  return (
    <Fragment>
      <span className="home">
        <Header
          name={currentUser.firstName}
          isAdmin={adminStatus}
          status={logStatus}
        />
        <Outlet />
      </span>
    </Fragment>
  );
};

export default Home;
