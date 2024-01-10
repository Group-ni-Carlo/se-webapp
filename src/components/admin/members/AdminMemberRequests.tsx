import { FC } from 'react';
import Icon from '@mdi/react';

import { RequestProps } from '../../../props/RequestProps';
import { mdiAccount, mdiCheck, mdiClose } from '@mdi/js';

const AdminMemberRequests: FC<RequestProps> = (props: {
  name: string;
  email: string;
  approveRequest: () => void;
  deleteRequest: () => void;
}) => {
  return (
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
        <span className={`body text-sm text-neutral-300`}>{props.email}</span>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <span onClick={props.approveRequest}>
          <Icon className="text-feedback-success" path={mdiCheck} size={1} />
        </span>
        <span onClick={props.deleteRequest}>
          <Icon className="text-feedback-error" path={mdiClose} size={1} />
        </span>
      </div>
    </div>
  );
};

export default AdminMemberRequests;
