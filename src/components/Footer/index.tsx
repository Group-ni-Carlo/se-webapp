import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
import { SvgIcon } from '../../common/SvgIcon';
import Container from '../../common/Container';

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = ({ t }: any) => {
  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
        className="transform hover:scale-110 transition-transform duration-100"
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <footer className="bg-gray-200 py-10">
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <h4 className="text-2xl capitalize text-black">{t('Contact')}</h4>
              <p className="text-black text-sm w-7/12">
                {t(
                  `Do you have any questions? Contact Us at psse.cpu@cpu.edu.ph`
                )}
              </p>
            </Col>
            <Col lg={10} md={10} sm={12} xs={12}>
              <h4 className="text-2xl capitalize text-black">{t('Address')}</h4>
              <p className="text-black text-sm w-7/12">Lopez Jaena St.</p>
              <p className="text-black text-sm w-7/12">Jaro, Iloilo City</p>
              <p className="text-black text-sm w-7/12">Philippines</p>
            </Col>
          </Row>
        </Container>
      </footer>
      <section className="bg-gray-200 relative w-full mx-auto pb-8">
        <Container border={true}>
          <Row justify="center" align="middle" className="pt-12">
            <div className="flex justify-center items-center space-x-20 max-w-md w-full text-center transition-all duration-100">
              <SocialLink
                href="https://github.com/Group-ni-Carlo/se-webapp-frontend"
                src="github.svg"
              />
              <SocialLink
                href="https://www.facebook.com/the.psse"
                src="facebook.svg"
              />
              <SocialLink href="mailto:psse.cpu@edu.ph" src="email.svg" />
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default withTranslation()(Footer);
