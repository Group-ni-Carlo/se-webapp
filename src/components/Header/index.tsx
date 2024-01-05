import { useState, useEffect } from 'react';
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

type HeaderProps = {
  name: string;
  userType: string;
  status: boolean;
  linkToProfile: () => void;
};

const Header = (props: {
  name: string;
  userType: string;
  status: boolean;
  linkToProfie: () => void;
}) => {
  const [visible, setVisibility] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const checkUserType = (type: string) => {
    if (!type) {
      console.log('User not logged in');
    } else {
      if (type === 'admin') {
        setIsAdmin(true);
      }
    }
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
        <CustomNavLinkSmall onClick={() => navigate('/merch')}>
          <Span>{'Merch'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('partners')}>
          <Span>{'Partners & Sponsors'}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo('organizations')}>
          <Span>{'Organizations'}</Span>
        </CustomNavLinkSmall>
        {isAdmin ? (
          <CustomNavLinkSmall onClick={() => navigate('/admin')}>
            <Span>{'Admin'}</Span>
          </CustomNavLinkSmall>
        ) : (
          <span></span>
        )}
        <CustomNavLinkSmall onClick={() => handleLogStatus(props.status)}>
          <Span>{props.status ? 'Log Out' : 'Log In'}</Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  useEffect(() => {
    checkUserType(props.userType);
  }, []);

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
                {!props.status ? (
                  <Menu>Menu</Menu>
                ) : (
                  <Menu onClick={props.linkToProfie}>{props.name}</Menu>
                )}
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
