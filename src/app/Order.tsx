import React, { Fragment } from 'react';

import OrderForm from '../components/merch/OrderForm';

const Order: React.FC = () => {
  const submit = async (e: React.FormEvent, file: File | null) => {
    e.preventDefault();

    const formData: FormData = new FormData();
    formData.append('image', file!);

    const uploadOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await fetch(
      'http://localhost:5000/order/upload',
      uploadOptions
    );
    const data = res.json();
  };

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
