import React, { Fragment, useState, useEffect } from 'react';

import Container from '../../common/Container';
import Partners from '../../components/Partners/index';
import IntroContent from '../../components/Intro/index';
import AboutUs from '../../components/AboutUs/index';
import Footer from '../../components/Footer/';
import { PartnersListUser } from '../../admin/partners/Partners';
import checkIfLoggedIn from '../auth/checkIfLoggedIn';

const LandingPage: React.FC = () => {
  const [logStatus, setLogStatus] = useState(false);

  const { isLoggedIn } = checkIfLoggedIn();

  useEffect(() => {
    setLogStatus(isLoggedIn);
  }, []);
  return (
    <Fragment>
      <Container>
        <IntroContent />
        <Partners isLogged={logStatus} />
        <AboutUs />
      </Container>
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
