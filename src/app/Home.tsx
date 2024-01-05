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

const Home = () => {
  const token = localStorage.getItem('token');
  const fetchUser = async () => {
    const res = await fetch('https://sewebapp.onrender.com/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const { me } = await res.json();

    window.alert(JSON.stringify(me));
  };

  useEffect(() => {
    fetchUser();
    window.alert('Hello');
  }, []);
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
