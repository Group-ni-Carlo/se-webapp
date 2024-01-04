import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiKeyboardBackspace,
  mdiBullhorn,
  mdiTshirtCrew,
  mdiHandshake,
  mdiAccount,
  mdiMenu
} from '@mdi/js';

const AdminNavBar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <Fragment>
      <section className="w-full flex items-center px-2.5 shadow-md flex-center flex-row h-12 bg-shade-light z-0 border-b-2 border-solid border-neutral-100">
        <div
          className="flex gap-2 flex-center z-0"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <Icon
            className="bg-primary-700 text-shade-light rounded-lg p-0.5"
            path={mdiMenu}
            size={1.05}
          />
        </div>

        <div className="sm:flex hidden items-center ml-2 pt-1 text-xl">
          <h1 className={`title text-secondary-700`}>Software Engineering</h1>
        </div>
      </section>
      {toggleMenu && (
        <div
          className={`flex flex-col absolute h-full body bg-shade-light w-56 m-0 shadow-md top-0 gap-y-5 z-10 animate-slideInFromLeft`}
        >
          <div className="flex relative inset-0 flex-col mt-5 ml-5 w-full">
            <span
              className="bg-shade-light hover:bg-neutral-300 active:bg-secondary-100 w-8 rounded-md"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <Icon
                className="text-primary-700"
                path={mdiKeyboardBackspace}
                size={1.2}
              />
            </span>
          </div>
          <div className="flex flex-col mt-5 w-full gap-y-4">
            <Link
              to="/admin/announcements"
              className="flex flex-row gap-x-2 pl-10 py-2 bg-shade-light hover:bg-neutral-300 active:bg-secondary-100"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <Icon className="text-primary-700" path={mdiBullhorn} size={1} />
              <h1>Announcements</h1>
            </Link>
            <Link
              to="/admin/Merchandise"
              className="flex flex-row gap-x-2 pl-10 py-2 bg-shade-light hover:bg-neutral-300 active:bg-secondary-100"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <Icon
                className="text-primary-700"
                path={mdiTshirtCrew}
                size={1}
              />
              <h1>Merchandise</h1>
            </Link>
            <Link
              to="/admin/sponsors"
              className="flex flex-row gap-x-2 pl-10 py-2 bg-shade-light hover:bg-neutral-300 active:bg-secondary-100"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <Icon className="text-primary-700" path={mdiHandshake} size={1} />
              <h1>Sponsors</h1>
            </Link>
            <Link
              to="/admin/members"
              className="flex flex-row gap-x-2 pl-10 py-2 bg-shade-light hover:bg-neutral-300 active:bg-secondary-100"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <Icon className="text-primary-700" path={mdiAccount} size={1} />
              <h1>Members</h1>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AdminNavBar;
