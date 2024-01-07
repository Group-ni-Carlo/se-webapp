import { FC } from 'react';
import { MerchDataOrderProps } from '../../../props/MerchDataOrderProps';

const MerchCardOrder: FC<MerchDataOrderProps> = ({
  id,
  title,
  price,
  sales,
  imageSrc
}) => {
  console.log('React Image Src:', imageSrc);

  return (
    <div className="border border-neutral-100 shadow-md rounded-lg mr-4">
      <div className="w-[356px] h-[356px]">
        <img
          src={imageSrc}
          alt=""
          className="border-b border-b-neutral-100 rounded-lg w-full h-full"
        />
      </div>
      <div className="flex flex-col px-4 pt-2 pb-6 body">
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm text-neutral-500 pt-4">Price: ₱{price}</p>
        <p className="text-sm text-neutral-500">Sales: {sales}</p>
      </div>
    </div>
  );
};

export default MerchCardOrder;
