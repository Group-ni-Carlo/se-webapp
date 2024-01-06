import React, { Fragment, useState, useEffect } from 'react';
import AnnouncementCard from '../components/admin/announcements/AnnouncementCard';
import { Link } from 'react-router-dom';
import { AnnouncementDataProps } from '../props/announcements';

import { headers } from '../utils/headers';

const Announcements = () => {
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
    <div className="flex flex-col items-center gap-4 justify-center m-4 lg:flex-row">
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
  );
};

export default Announcements;
