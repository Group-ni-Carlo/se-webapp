import { FC, Fragment, useState, useEffect } from 'react';

import { AnnouncementDataProps } from '../props/announcements';
import { headers } from '../utils/headers';
import AnnouncementCardUser from '../components/admin/announcements/AnnouncementCardUser';

const Announcements: FC = () => {
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
      <div className="flex flex-col items-center gap-4 justify-center m-4 lg:flex-row">
        {announcementsData.length > 0 ? (
          announcementsData.map((announcement) => (
            <AnnouncementCardUser
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

export default Announcements;
