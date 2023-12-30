import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
import { SvgIcon } from '../../../common/SvgIcon';
import { Button } from '../../../common/Button';
import { ContentBlockProps } from '../types';
import { Fade } from 'react-awesome-reveal';

const FadeAny = Fade as any;

const RightBlock = ({
  title,
  content,
  button,
  icon,
  t,
  id
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <section className="relative py-20 px-8 lg:py-32 lg:px-0">
      <FadeAny direction="right">
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <div className="relative max-w-md lg:pb-16">
              <h6 className="mb-4">{t(title)}</h6>
              <p className="mb-8">{t(content)}</p>
              <div className="flex justify-between max-w-full lg:max-w-4/5">
                {typeof button === 'object' &&
                  button.map((item: any, id: number) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        fixedWidth={true}
                        onClick={() => scrollTo('about')}
                      >
                        {t(item.title)}
                      </Button>
                    );
                  })}
              </div>
            </div>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
        </Row>
      </FadeAny>
    </section>
  );
};

export default withTranslation()(RightBlock);
