import { FC, Fragment } from 'react';
import MerchCardOrder from '../components/admin/merch/MerchCardOrder';
const Statistics: FC = () => {
  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="flex flex-col items-center lg:items-start lg:pl-12 gap-4 border-t border-b py-2 border-solid border-secondary-700 flex-1 mt-4 ">
          <div className="flex flex-col sm:gap-2 mb-4 ">
            <div className="text-xl title">Revenue</div>
            <div className="text-4xl body">P2000</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl title">Sold Items</div>
            <div className="text-4xl body">2000</div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <MerchCardOrder
            id={1}
            title={'Hello'}
            sales={1}
            price={300}
            imageSrc={
              'https://w7.pngwing.com/pngs/147/495/png-transparent-smiley-thumb-signal-emoticon-meme-smiley-love-miscellaneous-face-thumbnail.png'
            }
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Statistics;
