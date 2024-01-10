import { FC } from 'react';
import { PartnersDataProps } from '../../props/partners';

const PartnersList: FC<PartnersDataProps> = ({ imageSrc }) => {
  return (
    <div>
      <img src={imageSrc} alt="" />
    </div>
  );
};

export default PartnersList;
