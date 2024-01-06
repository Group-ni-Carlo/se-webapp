import React, { Fragment, useState } from 'react';
import IndivMerch from '../components/Merch/IndivMerch';

const Merch = () => {
  const [merchClick, setMerchClick] = useState(false);

  return (
    <Fragment>
      <div className="flex flex-col gap-12 w-full justify-center items-center">
        <div className="flex flex-row w-fit bg-primary-700">
          <div
            className="justify-end"
            onClick={() => setMerchClick(!merchClick)}
          >
            This is a merch item
            {merchClick ? (
              <span>It is clicked</span>
            ) : (
              <span>It is not clicked</span>
            )}
          </div>
        </div>
      </div>

      <IndivMerch
        close={() => setMerchClick(!merchClick)}
        isHidden={merchClick}
        title="Hoodie"
        description="Lorem ipsum what"
        price="200 PHP"
      />
    </Fragment>
  );
};

export default Merch;
