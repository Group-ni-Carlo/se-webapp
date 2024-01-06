import React, { Fragment, useState, useEffect } from 'react';
import { UserProps } from './Home';
import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import { PartnersListUser } from '../admin/partners/Partners';

const Partners = () => {
  const [logStatus, setLogStatus] = useState(false);
  useEffect(() => {
    const { isLoggedIn } = checkIfLoggedIn();
    setLogStatus(isLoggedIn);
  });

  return (
    <Fragment>
      <PartnersListUser isLogged={logStatus} />
    </Fragment>
  );
};

export default Partners;
