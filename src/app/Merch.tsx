import { FC, Fragment, useState, useEffect } from 'react';

import { MerchDataProps } from '../props/MerchDataProps';
import { headers } from '../utils/headers';
import MerchCardUser from '../components/admin/merch/MerchCardUser';

const Merch: FC = () => {
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
      <div className="flex flex-col items-center gap-4 justify-center m-4 lg:flex-row">
        {merchData.length > 0 ? (
          merchData.map((merch) => (
            <MerchCardUser
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
            <span className="text-2xl text-feedback-error">No merch yet!</span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Merch;
