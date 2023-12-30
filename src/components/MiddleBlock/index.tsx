import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
import { Slide } from 'react-awesome-reveal';
import { Button } from '../../common/Button';

interface MiddleBlockProps {
  title: string;
  content: string;
  button: string;
  t: any;
}

const SlideAny = Slide as any;

const MiddleBlock = ({ title, content, button, t }: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <section className="relative py-30 text-center flex justify-center mt-10">
      <SlideAny direction="up">
        <Row
          justify="center"
          align="middle"
          className="max-w-570px md:max-w-full"
        >
          <Col lg={24} md={24} sm={24} xs={24}>
            <h6>{t(title)}</h6>
            <p className="py-3">{t(content)}</p>
            {button && (
              <Button name="submit" onClick={() => scrollTo('mission')}>
                {t(button)}
              </Button>
            )}
          </Col>
        </Row>
      </SlideAny>
    </section>
  );
};

export default withTranslation()(MiddleBlock);
