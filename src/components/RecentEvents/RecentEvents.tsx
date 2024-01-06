import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import logo from '../../assets/img/icons/2922280_27002.jpg';

const FadeAny = Fade as any;

const Events = () => {
  return (
    <section id="events" className="relative py-30 md:px-16 md:py-32">
      <FadeAny direction="left">
        <Row justify="center" align="middle">
          <Col>
            <div className="relative md:pt-32">
              <h5 className="text-white leading-1rem py-8 font-montserrat">
                Recent Events
              </h5>
              <p className="my-24">
                Relevant information about the organization and its activities.
              </p>
              <div className="flex justify-between items-center max-w-full">
                <Row justify="center" align="middle">
                  <Col span={11}>
                    <img src={logo} width="100px" height="100px" />
                    <h6 className="text-white uppercase leading-1rem py-4 font-montserrat">
                      Lorem Ipsum
                    </h6>
                    <p className="text-sm pb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Praesent ut est et est tristique feugiat.
                    </p>
                    <img src={logo} width="100px" height="100px" />
                    <h6 className="text-white uppercase leading-1rem py-4 font-montserrat">
                      Lorem Ipsum
                    </h6>
                    <p className="text-sm pb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Praesent ut est et est tristique feugiat.
                    </p>
                  </Col>
                  <Col span={11}>
                    <img src={logo} width="100px" height="100px" />
                    <h6 className="text-white uppercase leading-1rem py-4 font-montserrat">
                      Lorem Ipsum
                    </h6>
                    <p className="text-sm pb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Praesent ut est et est tristique feugiat.
                    </p>
                    <img src={logo} width="100px" height="100px" />
                    <h6 className="text-white uppercase leading-1rem py-4 font-montserrat">
                      Lorem Ipsum
                    </h6>
                    <p className="text-sm pb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Praesent ut est et est tristique feugiat.
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </FadeAny>
    </section>
  );
};

export default Events;
