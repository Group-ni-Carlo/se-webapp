import { FC, Fragment, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from '../components/admin/AdminNavBar';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import checkIfAdmin from '../components/auth/checkIfAdmin';

const Admin: FC = () => {
  const [adminStatus, setAdminStatus] = useState(false);

  const { isLoggedIn } = checkIfLoggedIn();
  const { isAdmin, adminLoading } = checkIfAdmin();

  useEffect(() => {
    setAdminStatus(isAdmin);
  }, [isLoggedIn, isAdmin, adminLoading]);
  return (
    <Fragment>
      {adminStatus ? (
        <span>
          <AdminNavBar />
          <Outlet />
        </span>
      ) : (
        <div className="flex flex-1 align-center justify-center">
          <span className="text-feedback-error text-4xl">
            You are not an admin!
          </span>
        </div>
      )}
    </Fragment>
  );
};

export default Admin;
