import { Fragment, useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from '../components/Header/';
import '../index.css';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
}

const Home = () => {
  let currentUser: UserProps;
  const navigate = useNavigate();
  const { user, isLoggedIn, loading } = checkIfLoggedIn();

  const redirectToProfile = () => {
    navigate(`/user/${currentUser.id}`);
  };

  if (!user) {
    currentUser = {
      id: 0,
      firstName: '',
      lastName: '',
      type: ''
    };
  } else {
    currentUser = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      type: user.type
    };
  }

  useEffect(() => {
    if (!loading) {
      window.alert(`Logged in: ${isLoggedIn}`);
    }
  }, [isLoggedIn, loading]);

  return (
    <Fragment>
      <span className="home">
        <Header
          name={currentUser.firstName}
          userType={currentUser.type}
          status={isLoggedIn}
          linkToProfie={() => redirectToProfile()}
        />
        <Outlet />
      </span>
    </Fragment>
  );
};

export default Home;
