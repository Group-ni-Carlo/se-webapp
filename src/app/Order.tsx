import React, { Fragment } from 'react';

import OrderForm from '../components/merch/OrderForm';

const Order: React.FC = () => {
  return (
    <Fragment>
      <div className="flex flex-row flex-1 justify-center items-center">
        <span className="text-4xl title">Order Page</span>
      </div>
      <div className="flex flex-1 justify-center items-center">Hello</div>
    </Fragment>
  );
};

export default Order;
