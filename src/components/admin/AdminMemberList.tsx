import React, { Fragment } from 'react';
import Icon from '@mdi/react';
import { mdiAccount, mdiDelete } from '@mdi/js';

type Props = {
  name: string;
  year: string;
};

const AdminMemberList: React.FC<Props> = (props: {
  name: string;
  year: string;
}) => {
  return (
    <Fragment>
      <div className="flex flex-row w-full gap-4 border-y border-solid border-primary-300 items-center mt-4 py-4 px-4">
        <div className="flex">
          <Icon
            className="text-neutral-300 border border-shade-dark rounded-3xl py-0.5"
            path={mdiAccount}
            size={1.5}
          />
        </div>
        <div className="flex flex-col w-full gap-0">
          <span className={`body text-md`}>{props.name}</span>
          <span className={`body text-sm text-neutral-300`}>{props.year}</span>
        </div>
        <div className="flex flex-row gap-4 justify-end">
          <span>
            <Icon className="text-shade-dark" path={mdiAccount} size={1} />
          </span>
          <span>
            <Icon className="text-shade-dark" path={mdiDelete} size={1} />
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminMemberList;
