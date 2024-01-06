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
  const [logStatus, setLogStatus] = useState(false);

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
        setLogStatus(isLogged);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="flex m-4">
        {logStatus ? (
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
          <></>
        )}
      </div>
    </Fragment>
  );
};
