import React, { Fragment } from 'react';
import Product from '../components/merchandise/MerchPage';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Fragment>
      <div>
        <Product />
      </div>
      <Outlet />
    </Fragment>
  );
};

export default App;
