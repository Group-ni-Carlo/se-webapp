import React, { Fragment, useEffect, useState } from 'react';
import Icon from '@mdi/react';

import { mdiAccount, mdiAccountCheck } from '@mdi/js';
import AdminMemberList from '../components/admin/AdminMemberList';
import AdminMemberRequests from '../components/admin/AdminMemberRequests';

const Members: React.FC = () => {
  const [activeSelection, setActiveSelection] = useState(0);
  return (
    <Fragment>
      <nav
        className={`flex flex-row items-center justify-center bg-shade-light z-10 w-full border-b-2 border-neutral-300 border-solid body`}
      >
        <div
          className={`flex flex-row items-center gap-2 w-full justify-center py-2 ${
            activeSelection === 0
              ? 'bg-gradient-to-r from-primary-700 via-primary-500 to-primary-300'
              : 'bg-white'
          }`}
          onClick={() => setActiveSelection(0)}
        >
          <Icon
            className="text-neutral-700 rounded-lg p-0.5"
            path={mdiAccount}
            size={1.05}
          />
          <h1>Members</h1>
        </div>
        <div
          className={`flex flex-row items-center gap-2 w-full justify-center py-2 ${
            activeSelection === 1
              ? 'bg-gradient-to-r from-primary-700 via-primary-500 to-primary-300'
              : 'bg-white'
          }`}
          onClick={() => setActiveSelection(1)}
        >
          <Icon
            className="text-neutral-700 rounded-lg p-0.5"
            path={mdiAccountCheck}
            size={1.05}
          />
          <h1>Requests</h1>
        </div>
      </nav>
      {activeSelection === 0 ? (
        <AdminMemberList name={'Test Name'} year="Test Year" />
      ) : (
        <AdminMemberRequests
          name={'Test Name'}
          year={'Test Year'}
          email={'test.email-70@cpu.edu.ph'}
        />
      )}
    </Fragment>
  );
};

export default Members;
