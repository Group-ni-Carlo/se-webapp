import { FC, Fragment, useState, useEffect } from 'react';
import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';
import { PartnersListUser } from '../admin/partners/PartnersListUser';

const Partners: FC = () => {
  const [logStatus, setLogStatus] = useState(false);
  const { isLoggedIn } = checkIfLoggedIn();
  useEffect(() => {
    setLogStatus(isLoggedIn);
  });

  return (
    <Fragment>
      <PartnersListUser isLogged={logStatus} />
    </Fragment>
  );
};

export default Partners;
