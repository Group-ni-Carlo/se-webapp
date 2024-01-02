import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import logo from '../../assets/img/icons/2922280_27002.jpg';

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
                Relevant information about the organization and its activities
              </p>
              <div className="flex justify-between items-center max-w-full">
                <Row justify="center" align="middle">
                  <Col span={11}>
                    <div className="flex justify-center gap-5">
                      <img src={logo} width="150px" height="150px" />
                      <img src={logo} width="150px" height="150px" />
                      <img src={logo} width="150px" height="150px" />
                    </div>
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

export default Partners;
