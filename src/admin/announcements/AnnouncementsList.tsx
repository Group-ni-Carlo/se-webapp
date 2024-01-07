import { FC, Fragment, useState, useEffect } from 'react';
import AnnouncementCard from '../../components/admin/announcements/AnnouncementCard';
import { Link } from 'react-router-dom';
import { AnnouncementDataProps } from '../../props/announcements';

import { headers } from '../../utils/headers';

export const AnnouncementsList: FC = () => {
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
        <h1
          className={`title text-shade-light mx-auto p-4 bg-secondary-700 rounded-lg text-3xl my-8`}
        >
          Create Announcements
        </h1>
      </Link>
      <div className="flex flex-col m-4 lg:flex-row">
        {announcementsData.length > 0 ? (
          announcementsData.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              id={announcement.id}
              title={announcement.title}
              caption={announcement.caption}
              imageSrc={announcement.imageSrc}
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
