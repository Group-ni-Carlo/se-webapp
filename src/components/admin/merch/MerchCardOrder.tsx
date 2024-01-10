import { FC } from 'react';
import { MerchDataOrderProps } from '../../../props/MerchDataOrderProps';

const MerchCardOrder: FC<MerchDataOrderProps> = ({
  id,
  title,
  price,
  sales,
  revenue,
  imageSrc
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
      <div className="relative">
        <img src={imageSrc} alt="" className="w-full h-64 object-cover" />
      </div>
      <div className="py-6 px-4 space-y-2">
        <h1 className="font-bold text-gray-800 text-lg leading-tight">
          {title}
        </h1>
        <p className="text-gray-600 text-sm">Price: ₱{price}</p>
        <p className="text-gray-600 text-sm">Revenue: ₱{revenue}</p>
        <p className="text-gray-600 text-sm">Sales: {sales}</p>
      </div>
    </div>
  );
};

export default MerchCardOrder;
