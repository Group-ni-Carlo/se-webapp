import React, { Fragment, useState, useEffect, ChangeEvent } from 'react';

interface OrderProps {
  item: string;
  submit: (e: React.FormEvent, file: File | null) => void;
}

const OrderForm: React.FC<OrderProps> = ({ item, submit }) => {
  const [itemName, setItemName] = useState('');
  const [orderReceipt, setOrderReceipt] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderReceipt(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    setItemName(item);
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col flex-1 justify-center items-center">
        <form onSubmit={(e) => submit(e, orderReceipt)}>
          <input type="text" value={itemName} readOnly></input>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          ></input>

          <button type="submit">Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default OrderForm;
