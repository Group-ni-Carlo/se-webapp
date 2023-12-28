import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
import { SvgIcon } from '../../../common/SvgIcon';
import { ContentBlockProps } from '../types';
import { Fade } from 'react-awesome-reveal';
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara
} from './styles';

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
    <LeftContentSection>
      <FadeAny direction="left">
        <Row justify="center" align="middle" id={id}>
          <Col>
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              <ServiceWrapper>
                <Row justify="center" align="middle">
                  {typeof section === 'object' &&
                    section.map((item: any, id: number) => {
                      return (
                        <Col key={id} span={11}>
                          <SvgIcon src={icon} width="100px" height="100px" />
                          <MinTitle>{t(item.title)}</MinTitle>
                          <MinPara>{t(item.content)}</MinPara>
                          <SvgIcon src={icon} width="100px" height="100px" />
                          <MinTitle>{t(item.title)}</MinTitle>
                          <MinPara>{t(item.content)}</MinPara>
                          <SvgIcon src={icon} width="100px" height="100px" />
                          <MinTitle>{t(item.title)}</MinTitle>
                          <MinPara>{t(item.content)}</MinPara>
                        </Col>
                      );
                    })}
                </Row>
              </ServiceWrapper>
            </ContentWrapper>
          </Col>
        </Row>
      </FadeAny>
    </LeftContentSection>
  );
};

export default withTranslation()(LeftContentBlock);
