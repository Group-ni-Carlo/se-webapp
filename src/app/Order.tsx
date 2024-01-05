import React, { Fragment } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import OrderForm from '../components/merch/OrderForm';

const Order: React.FC = () => {
  let orderedItem: string;
  const [searchParams] = useSearchParams();
  const item = searchParams.get('item');
  console.log(item);

  if (!item) orderedItem = '';
  else orderedItem = item;

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
      <OrderForm item={orderedItem} submit={submit} />
    </Fragment>
  );
};

export default Order;
