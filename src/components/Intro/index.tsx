import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import image from './se-logo.jpg';

const FadeAny = Fade as any;

const IntroContent = () => {
  return (
    <section className="relative py-20 px-8 lg:py-32 lg:px-0">
      <FadeAny direction="right">
        <Row justify="space-between" align="middle">
          <Col lg={11} md={11} sm={11} xs={24}>
            <div className="relative max-w-lg lg:pb-16">
              <h5 className="mb-8">Welcome to Software Engineering</h5>
              <p className="mb-8">
                the application of a systematic, disciplined, quantifiable
                approach to the development, operation, and maintenance of
                software, and the study of these approaches; that is, the
                application of engineering to software.
              </p>
            </div>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <img src={image} width="250px" height="250px" className="mb-32" />
          </Col>
        </Row>
      </FadeAny>
    </section>
  );
};

export default IntroContent;
