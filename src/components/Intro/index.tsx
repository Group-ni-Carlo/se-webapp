import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import image from '../../assets/img/icons/2922280_27002.jpg';

const FadeAny = Fade as any;

const IntroContent = () => {
  return (
    <section className="relative py-20 px-8 lg:py-32 lg:px-0">
      <FadeAny direction="right">
        <Row justify="space-between" align="middle">
          <Col lg={11} md={11} sm={11} xs={24}>
            <div className="relative max-w-lg lg:pb-16">
              <h6 className="mb-4">Welcome to Software Engineering</h6>
              <p className="mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent ut est et est tristique feugiat. Maecenas pharetra
                tellus felis, id vestibulum ligula venenatis vitae. Aliquam.
              </p>
            </div>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <img src={image} width="250px" height="250px" />
          </Col>
        </Row>
      </FadeAny>
    </section>
  );
};

export default IntroContent;
