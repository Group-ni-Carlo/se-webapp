import React, { Fragment, useState, useEffect } from 'react';

import Container from '../../common/Container';
import IntroContent from '../Intro/Intro';
import AboutUs from '../AboutUs/AboutUs';
import Footer from '../Footer/Footer';
import PartnersFrontPage from '../Partners/Partners';
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
        <PartnersFrontPage isLogged={logStatus} />
        <AboutUs />
      </Container>
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
