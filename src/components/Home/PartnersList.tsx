import React from 'react';
import { PartnersDataProps } from '../../props/partners';

const PartnersList: React.FC<PartnersDataProps> = ({ imageSrc }) => {
  return (
    <div>
      <img src={imageSrc} alt="" />
    </div>
  );
};

export default PartnersList;
