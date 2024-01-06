import React, { Fragment, useState, useEffect } from 'react';
import { UserProps } from './Home';
import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import { PartnersListUser } from '../admin/partners/Partners';

const Partners = () => {
  const { isLoggedIn } = checkIfLoggedIn();

  return (
    <Fragment>
      <PartnersListUser isLogged={isLoggedIn} />
    </Fragment>
  );
};

export default Partners;
