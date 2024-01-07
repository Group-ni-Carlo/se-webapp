import { FC, Fragment } from 'react';
import Icon from '@mdi/react';

import { MemberProps } from '../../../props/MemberProps';
import { mdiAccount, mdiDelete } from '@mdi/js';

const AdminMemberList: FC<MemberProps> = (props: {
  name: string;
  type: string;
  deleteMember: () => void;
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
          <span className={`body text-sm text-neutral-300`}>{props.type}</span>
        </div>
        <div className="flex flex-row gap-4 justify-end">
          <span onClick={props.deleteMember}>
            <Icon className="text-shade-dark" path={mdiDelete} size={1} />
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminMemberList;
