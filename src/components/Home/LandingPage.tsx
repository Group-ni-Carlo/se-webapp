import React, { Fragment } from 'react';

import Container from '../../common/Container';
import Events from '../../components/RecentEvents/index';
import Organizations from '../../components/Organizations/index';
import Partners from '../../components/Partners/index';
import IntroContent from '../../components/Intro/index';
import AboutUs from '../../components/AboutUs/index';
import Footer from '../../components/Footer/';

const LandingPage = () => {
  return (
    <Fragment>
      <Container>
        <IntroContent />
        <AboutUs />
        <Events />
        <Partners />
        <Organizations />
      </Container>
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
