import React, { Fragment, useEffect, useState } from 'react';
import Icon from '@mdi/react';

import { mdiAccount, mdiAccountCheck } from '@mdi/js';
import AdminMemberList from '../components/admin/members/AdminMemberList';
import AdminMemberRequests from '../components/admin/members/AdminMemberRequests';

type Member = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  year_level: string;
};

const Members: React.FC = () => {
  const [activeSelection, setActiveSelection] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [requests, setRequests] = useState<Member[]>([]);

  const fetchMemberList = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_CONNECTION}/members/list`
    );
    const data = await res.json();
    setMembers(data);
  };

  const fetchRequests = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_CONNECTION}/members/requests`
    );
    const data = await res.json();
    setRequests(data);
  };

  const approveMember = async (key: number) => {
    const member = {
      id: key
    };
    const res = await fetch(`https://sewebapp.onrender.com/members/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    });
    if (!res.ok) {
      console.log('Error approving member!');
    }
    await fetchMemberList();
    await fetchRequests();
  };

  const deleteMemberOrRequest = async (key: number) => {
    const member = {
      id: key
    };
    const res = await fetch(`https://sewebapp.onrender.com/members/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    });
    if (!res.ok) {
      console.log('Error deleting member!');
    }
    await fetchMemberList();
    await fetchRequests();
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
              name={`${member.first_name} ${member.last_name}`}
              year={member.year_level}
              deleteMember={() => deleteMemberOrRequest(member.id)}
            />
          ))
        : requests.map((request) => (
            <AdminMemberRequests
              key={request.id}
              name={`${request.first_name} ${request.last_name}`}
              email={request.email}
              approveRequest={() => approveMember(request.id)}
              deleteRequest={() => deleteMemberOrRequest(request.id)}
            />
          ))}
    </Fragment>
  );
};

export default Members;
