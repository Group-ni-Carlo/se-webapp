import React, { Fragment, useEffect, useState } from 'react';
import Icon from '@mdi/react';

import { mdiAccount, mdiAccountCheck } from '@mdi/js';
import AdminMemberList from '../components/admin/AdminMemberList';
import AdminMemberRequests from '../components/admin/AdminMemberRequests';

type Member = {
  id: number;
  name: string;
  email: string;
  year: string;
};

const approveMember = async (key: number) => {
  const data = {
    id: key
  };
  const response = await fetch(
    `http://127.0.0.1:5000/members/requests/approve`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
  if (response.ok) {
    console.log('Approved member!');
  }
};

const deleteMemberOrRequest = async (key: number) => {
  const data = {
    id: key
  };
  const response = await fetch(`http://127.0.0.1:5000/members/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    console.log('Member deleted!');
  }
};

const Members: React.FC = () => {
  const [activeSelection, setActiveSelection] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [requests, setRequests] = useState<Member[]>([]);

  const fetchMemberList = async () => {
    const response = await fetch(`http://127.0.0.1:5000/members/list`);
    const data = await response.json();
    setMembers(data);
  };

  const fetchRequests = async () => {
    const response = await fetch(`http://127.0.0.1:5000/members/requests`);
    const data = await response.json();
    setRequests(data);
  };

  const fetchAfterHandling = () => {
    fetchRequests();
    fetchMemberList();
  };

  const handleApprove = async (key: number) => {
    await approveMember(key);
    fetchAfterHandling();
  };

  const handleDelete = async (key: number) => {
    await deleteMemberOrRequest(key);
    fetchAfterHandling();
  };

  useEffect(() => {
    fetchMemberList();
    fetchRequests();
  }, []);

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
      {activeSelection === 0
        ? members.map((member) => (
            <AdminMemberList
              key={member.id}
              name={member.name}
              year={member.year}
              deleteMember={() => deleteMemberOrRequest(member.id)}
            />
          ))
        : requests.map((request) => (
            <AdminMemberRequests
              key={request.id}
              name={request.name}
              email={request.email}
              approveRequest={() => handleApprove(request.id)}
              deleteRequest={() => handleDelete(request.id)}
            />
          ))}
    </Fragment>
  );
};

export default Members;
