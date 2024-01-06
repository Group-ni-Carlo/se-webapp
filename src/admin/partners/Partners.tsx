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

interface PartnersListProps {
  isLogged: boolean;
}

export const PartnersListUser: React.FC<PartnersListProps> = ({ isLogged }) => {
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
        <h1 className="mx-auto p-4 hover:bg-neutral-300 active:bg-secondary-100">
          Create Partners
        </h1>
      </Link>
      <div className="flex m-4">
        {!isLogged ? (
          <></>
        ) : (
          partnersData.map((partner: PartnerDataProps) => (
            <PartnerCard
              key={partner.id}
              id={partner.id}
              title={partner.title}
              logoSrc={partner.logoSrc}
              date={partner.date}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};
