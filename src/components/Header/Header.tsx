import { FC, useState } from 'react';
import { Row, Col, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';

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

import { HeaderProps } from '../../props/HeaderProps';

const Header: FC<HeaderProps> = (props: {
  name: string;
  isAdmin: boolean;
  status: boolean;
}) => {
  const [visible, setVisibility] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const handleLogStatus = (status: boolean) => {
    if (!status) {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      localStorage.clear();
      window.alert('User logged out');
      navigate(0);
    }
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id) as HTMLDivElement;
        element.scrollIntoView({
          behavior: 'smooth'
        });
        setVisibility(false);
      }, 2000);
    };
    return (
      <>
        {props.isAdmin ? (
          <CustomNavLinkSmall onClick={() => navigate('/admin')}>
            <Span>{'Admin'}</Span>
          </CustomNavLinkSmall>
        ) : (
          <span></span>
        )}
        {!props.status ? (
          <></>
        ) : (
          <span>
            <CustomNavLinkSmall onClick={() => navigate('/merch')}>
              <Span>{'Merch'}</Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall onClick={() => scrollTo('partners')}>
              <Span>{'Partners & Sponsors'}</Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall onClick={() => navigate('/announcements')}>
              <Span>{'Announcements'}</Span>
            </CustomNavLinkSmall>
          </span>
        )}
        <CustomNavLinkSmall onClick={() => handleLogStatus(props.status)}>
          <Span>{props.status ? 'Log Out' : 'Log In'}</Span>
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
