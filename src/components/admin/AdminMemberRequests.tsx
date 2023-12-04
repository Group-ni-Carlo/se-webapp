'use client';
import React from 'react';
import Icon from '@mdi/react';

import { mdiAccount, mdiCheck, mdiClose } from '@mdi/js';

type Props = {
  name: string;
  year: string;
  email: string;
};

const AdminMemberRequests: React.FC<Props> = (props: {
  name: string;
  year: string;
  email: string;
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
        <span>
          <Icon className="text-feedback-success" path={mdiCheck} size={1} />
        </span>
        <span>
          <Icon className="text-feedback-error" path={mdiClose} size={1} />
        </span>
      </div>
    </div>
  );
};

export default AdminMemberRequests;
