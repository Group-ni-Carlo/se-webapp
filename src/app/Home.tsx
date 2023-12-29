import { lazy } from 'react';
import IntroContent from '../content/IntroContent.json';
import AboutUs from '../content/AboutUs.json';
import RecentEvents from '../content/RecentEvents.json';
import PartnersAndSponsors from '../content/PartnersAndSponsors.json';
import Organizations from '../content/Organizations.json';
import ContactContent from '../content/ContactContent.json';

const Contact = lazy(() => import('../components/ContactForm'));
const MiddleBlock = lazy(() => import('../components/MiddleBlock'));
const Container = lazy(() => import('../common/Container'));
const ScrollToTop = lazy(() => import('../common/ScrollToTop'));
const ContentBlock = lazy(() => import('../components/ContentBlock'));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="image.svg"
        id="intro"
      />
      <MiddleBlock
        title={AboutUs.title}
        content={AboutUs.text}
        button={AboutUs.button}
      />
      <ContentBlock
        type="left"
        title={RecentEvents.title}
        content={RecentEvents.text}
        section={RecentEvents.section}
        icon="image.svg"
        id="about"
      />
      <ContentBlock
        type="right"
        title={PartnersAndSponsors.title}
        content={PartnersAndSponsors.text}
        icon="image.svg"
        id="mission"
      />
      <ContentBlock
        type="left"
        title={Organizations.title}
        content={Organizations.text}
        section={Organizations.section}
        icon="image.svg"
        id="product"
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
