import { Fragment, useEffect } from 'react';
import Container from '../common/Container';
import Events from '../components/RecentEvents/index';
import Organizations from '../components/Organizations/index';
import Partners from '../components/Partners/index';
import IntroContent from '../components/Intro/index';
import AboutUs from '../components/AboutUs/index';
import Footer from '../components/Footer/';
import Header from '../components/Header/';
import '../index.css';

import checkIfLoggedIn from '../components/auth/checkIfLoggedIn';

const Home = () => {
  const { isLoggedIn, loading } = checkIfLoggedIn();

  useEffect(() => {
    if (!loading) {
      window.alert(`Logged in: ${isLoggedIn}`);
    }
  }, [isLoggedIn, loading]);
  return (
    <Fragment>
      <Header />
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

export default Home;
