import React, { Fragment, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from '../components/admin/AdminNavBar';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import checkIfAdmin from '../components/auth/checkIfAdmin';

const Admin: React.FC = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    type: ''
  });
  const [adminStatus, setAdminStatus] = useState(false);

  const { user, isLoggedIn } = checkIfLoggedIn();
  const { isAdmin, adminLoading } = checkIfAdmin();

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
  }, [isLoggedIn, isAdmin, adminLoading]);
  return (
    <Fragment>
      <span>
        <AdminNavBar />
        <Outlet />
      </span>
    </Fragment>

    // <Fragment>
    //   {adminStatus ? (
    //     <span>
    //       <AdminNavBar />
    //       <Outlet />
    //     </span>
    //   ) : (
    //     <div className="flex flex-1 align-center justify-center">
    //       <span className="text-feedback-error text-4xl">
    //         You are not an admin!
    //       </span>
    //     </div>
    //   )}
    // </Fragment>
  );
};

export default Admin;
