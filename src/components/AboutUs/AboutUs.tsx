import { Row, Col } from 'antd';
import { Slide } from 'react-awesome-reveal';

const SlideAny = Slide as any;

const AboutUs = () => {
  return (
    <section className="relative pt-15 pb-30 text-center flex justify-center mt-10">
      <SlideAny direction="up">
        <Row
          justify="center"
          align="middle"
          className="max-w-570px md:max-w-full mb-48"
        >
          <Col lg={24} md={24} sm={24} xs={24}>
            <h5>About us</h5>
            <p className="py-3">We are the home of PSSE!</p>
          </Col>
        </Row>
      </SlideAny>
    </section>
  );
};

export default AboutUs;
