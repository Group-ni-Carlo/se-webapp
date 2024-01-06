import { Fragment, useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from '../components/Header/';
import '../index.css';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import checkIfAdmin from '../components/auth/checkIfAdmin';

interface UserProps {
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

  const { user, isLoggedIn } = checkIfLoggedIn();
  const { isAdmin } = checkIfAdmin();

  useEffect(() => {
    setAdminStatus(isAdmin);
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
          status={isLoggedIn}
        />
        <Outlet />
      </span>
    </Fragment>
  );
};

export default Home;
