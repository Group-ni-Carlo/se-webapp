import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const IndivMerch = (props: {
  close: () => void;
  isHidden: boolean;
  title: string;
  price: string;
  description: string;
}) => {
  const navigate = useNavigate();
  const redirectToOrder = () => {
    setTimeout(() => {
      navigate(`/order?item=${props.title}`);
    }, 1000);
  };

  return (
    <Fragment>
      <div
        className={`flex flex-col p-2 bg-shade-dark text-shade-light rounded-xl h-5/6 absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 ${
          !props.isHidden ? 'hidden' : ''
        } w-11/12 md:w-1/2`}
      >
        <img
          src="https://thetravelclub.ph/78591-large_default_2x/u-v-day-hoodie-men.jpg"
          alt="hoodie"
          className="h-1/2 w-full object-cover object-center aspect-square overflow-hidden"
        />
        <div className="flex flex-col mb-4">
          <span className="body text-2xl">{props.title}</span>
          <span className="body text-md">{props.price}</span>
        </div>
        <div className="flex flex-col flex-1">
          <span className="body text-md">{props.description}</span>
        </div>
        <div className="flex flex-row justify-end gap-4 ">
          <button className="bg-primary-700 px-6 py-3 self-end text-4xl title rounded-xl hover:bg-secondary-700 active:bg-secondary-500">
            <span onClick={props.close}>Close</span>
          </button>
          <button
            onClick={() => redirectToOrder()}
            className="bg-primary-700 px-6 py-3 self-end text-4xl title rounded-xl hover:bg-secondary-700 active:bg-secondary-500"
          >
            <span>Order</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default IndivMerch;
