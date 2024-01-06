import React, { Fragment, useState, useEffect } from 'react';
import MerchCard from '../../components/admin/merch/MerchCard';
import { Link } from 'react-router-dom';
import { MerchDataProps } from '../../props/announcements';

import { headers } from '../../utils/headers';

export const MerchList = () => {
  const [merchData, setMerchData] = useState<MerchDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/merch/`,
          {
            headers
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setMerchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Link to="/admin/merch/create" className="flex flex-row my-4">
        <h1 className="mx-auto p-4 hover:bg-neutral-300 active:bg-secondary-100">
          Create Merch
        </h1>
      </Link>
      <div className="flex m-4">
        {merchData.map((merch) => (
          <MerchCard
            key={merch.id}
            id={merch.id}
            title={merch.title}
            price={merch.price}
            caption={merch.caption}
            imageSrc={merch.imageSrc}
          />
        ))}
      </div>
    </Fragment>
  );
};
