import { useState } from 'react';
import { Row, Col, Drawer } from 'antd';
import Container from '../../common/Container';
import { SvgIcon } from '../../common/SvgIcon';
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span
} from './styles';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [visible, setVisibility] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const navigateToMerch = () => {
    setTimeout(() => {
      navigate('/merch');
    }, 1000);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: 'smooth'
      });
      setVisibility(false);
    };
    return (
      <>
        <CustomNavLinkSmall onClick={() => scrollTo('events')}>
          <Span>{'Events'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => navigateToMerch()}>
          <Span>{'Merch'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('partners')}>
          <Span>{'Partners & Sponsors'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('organizations')}>
          <Span>{'Organizations'}</Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: '2.5rem' }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default Header;
