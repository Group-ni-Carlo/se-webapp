import React, { Fragment, useState, useEffect } from 'react';
import AnnouncementCard from '../../components/admin/announcements/AnnouncementCard';
import AdminNavBar from '../../components/admin/AdminNavBar';
import { Link } from 'react-router-dom';
import { AnnouncementDataProps } from '../../props/announcements';

export const AnnouncementsList = () => {
  const [announcementsData, setAnnouncementsData] = useState<
    AnnouncementDataProps[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/announcements');

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
      <AdminNavBar />
      <Link to="/admin/create/announcements" className="flex flex-row my-4">
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
