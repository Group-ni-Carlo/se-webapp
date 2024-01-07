import { FC, Fragment } from 'react';

const AdminLandingPage: FC = () => {
  return (
    <Fragment>
      <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="flex flex-col body items-center gap-2">
          <div className="text-4xl text-secondary-700">
            Welcome to the Admin Page
          </div>
          <div className="text-xl text-secondary-700">
            Click the Hamburger Menu to get Started
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminLandingPage;
