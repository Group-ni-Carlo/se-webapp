import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import logo from '../../assets/img/icons/2922280_27002.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FadeAny = Fade as any;

const Partners = () => {
  return (
    <section id="partners" className="relative py-30 md:px-16">
      <FadeAny direction="right">
        <Row justify="center" align="middle">
          <Col>
            <div className="relative md:pt-32">
              <h6 className="text-white uppercase text-4xl leading-1rem py-8 font-montserrat">
                Partners and Sponsors
              </h6>
              <p className="my-12">
                In our commitment to collaboration and mutual growth, we are
                proud to acknowledge and appreciate the contributions of our
                valued partners and sponsors.
              </p>
              <Carousel className="mx-auto w-3/4" showArrows infiniteLoop>
                <div>
                  <img src={logo} />
                </div>
                <div>
                  <img src={logo} />
                </div>
                <div>
                  <img src={logo} />
                </div>
                <div>
                  <img src={logo} />
                </div>
                <div>
                  <img src={logo} />
                </div>
                <div>
                  <img src={logo} />
                </div>
              </Carousel>
            </div>
          </Col>
        </Row>
      </FadeAny>
    </section>
  );
};

export default Partners;
