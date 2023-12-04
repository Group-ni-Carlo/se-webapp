import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from '../components/admin/AdminNavBar';

const Admin: React.FC = () => {
  return (
    <Fragment>
      <AdminNavBar />
      <Outlet />
    </Fragment>
  );
};

export default Admin;
