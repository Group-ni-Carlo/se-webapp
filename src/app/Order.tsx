import React, { Fragment, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import OrderForm from '../components/Merch/OrderForm';
import { headers } from '../utils/headers';

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
      headers
    };

    const res = await fetch(
      'http://localhost:5000/order/upload',
      uploadOptions
    );
    const data = res.json();
  };

  useEffect(() => {
    document.body.classList.remove('home');
  });

  return (
    <Fragment>
      <OrderForm item={orderedItem} submit={submit} />
    </Fragment>
  );
};

export default Order;
