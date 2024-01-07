import React from 'react';
import { AnnouncementDataProps } from '../../../props/announcements';

const AnnouncementCardUser: React.FC<AnnouncementDataProps> = ({
  title,
  caption,
  imageSrc
}) => {
  console.log('React Image Src:', imageSrc);

  return (
    <div className="shadow-md  rounded-lg mr-4">
      <div className="w-[356px] h-[356px]">
        <img
          src={imageSrc}
          alt=""
          className="border-b border-b-neutral-100 rounded-lg w-full h-full"
        />
      </div>
      <div className="px-4 pt-2 pb-6">
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm text-neutral-500 pt-4">{caption}</p>
      </div>
    </div>
  );
};

export default AnnouncementCardUser;
