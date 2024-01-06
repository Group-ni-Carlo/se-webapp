import React, { Fragment } from 'react';

import Container from '../../common/Container';
import Partners from '../../components/Partners/index';
import IntroContent from '../../components/Intro/index';
import AboutUs from '../../components/AboutUs/index';
import Footer from '../../components/Footer/';

const LandingPage: React.FC = () => {
  return (
    <Fragment>
      <Container>
        <IntroContent />
        <Partners />
        <AboutUs />
      </Container>
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
