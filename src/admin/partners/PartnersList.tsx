import React, { Fragment, useState, useEffect } from 'react';
import PartnerCard from '../../components/admin/partners/PartnerCard';
import { Link } from 'react-router-dom';
import { headers } from '../../utils/headers';

interface PartnerDataProps {
  id: number;
  title: string;
  logoSrc: string;
  date: string;
}

export const PartnersList: React.FC = () => {
  const [partnersData, setPartnersData] = useState<PartnerDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/partners`,
          { headers }
        );

        if (!response.ok) {
          setPartnersData([
            {
              id: 1,
              title: '',
              logoSrc: '',
              date: ''
            }
          ]);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setPartnersData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Link to="/admin/partners/create" className="flex flex-row my-4">
        <h1
          className={`title text-shade-light mx-auto p-4 bg-secondary-700 rounded-lg text-3xl my-8`}
        >
          Create Partners
        </h1>
      </Link>
      <div className="flex flex-col m-4 lg:flex-row">
        {partnersData.length > 0 ? (
          partnersData.map((partner: PartnerDataProps) => (
            <PartnerCard
              key={partner.id}
              id={partner.id}
              title={partner.title}
              logoSrc={partner.logoSrc}
              date={partner.date}
            />
          ))
        ) : (
          <div className="flex flex-row w-full w-full gap-4 border-y border-solid border-secondary-700 items-center justify-center mt-4 py-4 px-4">
            <span className="text-2xl text-feedback-error">
              No partners yet!
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};
