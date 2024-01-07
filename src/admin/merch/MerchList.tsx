import { FC, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MerchDataProps } from '../../props/MerchDataProps';
import { headers } from '../../utils/headers';
import MerchCard from '../../components/admin/merch/MerchCard';

export const MerchList: FC = () => {
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
        <h1
          className={`title text-shade-light mx-auto p-4 bg-secondary-700 rounded-lg text-3xl my-8`}
        >
          Create Merch
        </h1>
      </Link>
      <div className="flex m-4">
        {merchData.length > 0 ? (
          merchData.map((merch) => (
            <MerchCard
              key={merch.id}
              id={merch.id}
              title={merch.title}
              price={merch.price}
              caption={merch.caption}
              imageSrc={merch.imageSrc}
            />
          ))
        ) : (
          <div className="flex flex-row w-full w-full gap-4 border-y border-solid border-secondary-700 items-center justify-center mt-4 py-4 px-4">
            <span className="text-2xl text-feedback-error">
              No announcements yet!
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};
