import React from 'react';
import { Link } from 'react-router-dom';

interface PartnerDataProps {
  id: number;
  logoSrc: string;
  title: string;
  date: string;
}

const PartnerCard: React.FC<PartnerDataProps> = ({
  id,
  logoSrc,
  title,
  date
}) => {
  console.log('React Image Src:', logoSrc);

  return (
    <Link to={`/admin/partners/edit/${id}`}>
      <div className="shadow-md rounded-lg mr-4">
        <div className="w-[356px] h-[356px]">
          <img
            src={logoSrc}
            alt=""
            className="border-b border-b-neutral-100 rounded-lg w-full h-full"
          />
        </div>
        <div className="px-4 pt-2 pb-6">
          <h1 className="text-xl">{title}</h1>
          <h1 className="text-l">{date}</h1>
        </div>
      </div>
    </Link>
  );
};

export default PartnerCard;
