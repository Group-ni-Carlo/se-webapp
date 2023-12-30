import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
import { SvgIcon } from '../../../common/SvgIcon';
import { ContentBlockProps } from '../types';
import { Fade } from 'react-awesome-reveal';

const FadeAny = Fade as any;

const LeftContentBlock = ({
  icon,
  title,
  content,
  section,
  t,
  id
}: ContentBlockProps) => {
  return (
    <section className="relative py-30 md:px-16 md:py-32">
      <FadeAny direction="left">
        <Row justify="center" align="middle" id={id}>
          <Col>
            <div className="relative md:pt-32">
              <h6 className="text-white uppercase text-4xl leading-1rem py-8 font-montserrat">
                {t(title)}
              </h6>
              <p className="my-24">{t(content)}</p>
              <div className="flex justify-between items-center max-w-full">
                <Row justify="center" align="middle">
                  {typeof section === 'object' &&
                    section.map((item: any, id: number) => {
                      return (
                        <Col key={id} span={11}>
                          <SvgIcon src={icon} width="100px" height="100px" />
                          <h6 className="text-white uppercase text-base leading-1rem py-8 font-montserrat">
                            {t(item.title)}
                          </h6>
                          <p className="text-sm">{t(item.content)}</p>
                          <SvgIcon src={icon} width="100px" height="100px" />
                          <h6 className="text-white uppercase text-base leading-1rem py-8 font-montserrat">
                            {t(item.title)}
                          </h6>
                          <p className="text-sm">{t(item.content)}</p>
                          <SvgIcon src={icon} width="100px" height="100px" />
                          <h6 className="text-white uppercase text-base leading-1rem py-8 font-montserrat">
                            {t(item.title)}
                          </h6>
                          <p className="text-sm">{t(item.content)}</p>
                        </Col>
                      );
                    })}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </FadeAny>
    </section>
  );
};

export default withTranslation()(LeftContentBlock);
