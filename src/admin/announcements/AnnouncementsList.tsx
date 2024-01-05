import React, { Fragment, useState, useEffect } from 'react';
import AnnouncementCard from '../../components/admin/announcements/AnnouncementCard';
import { Link } from 'react-router-dom';
import { AnnouncementDataProps } from '../../props/announcements';

import { headers } from '../../utils/headers';

export const AnnouncementsList = () => {
  const [announcementsData, setAnnouncementsData] = useState<
    AnnouncementDataProps[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/announcements/`,
          {
            headers
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setAnnouncementsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Link to="/admin/announcements/create" className="flex flex-row my-4">
        <h1 className="mx-auto p-4 hover:bg-neutral-300 active:bg-secondary-100">
          Create Announcements
        </h1>
      </Link>
      <div className="flex m-4">
        {announcementsData.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            id={announcement.id}
            title={announcement.title}
            caption={announcement.caption}
            imageSrc={announcement.imageSrc}
          />
        ))}
      </div>
    </Fragment>
  );
};
