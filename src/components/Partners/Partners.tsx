import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import { Carousel } from 'react-responsive-carousel';
import { headers } from '../../utils/headers';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import PartnersList from '../Home/PartnersList';
import { PartnersDataProps } from '../../props/partners';

type Partner = {
  id: number;
  logoSrc: string;
  title: string;
  date: string;
};

const FadeAny = Fade as any;

interface PartnerProp {
  isLogged: boolean;
}

const PartnersFrontPage: React.FC<PartnerProp> = ({ isLogged }) => {
  const [partnersData, setPartnersData] = useState<Partner[]>([]);
  const [logStatus, setLogStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/partners`,
          { headers }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setPartnersData(data);
        setLogStatus(isLogged);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Fragment>
      {logStatus ? (
        <></>
      ) : (
        <section id="partners" className="relative py-30 md:px-16">
          <FadeAny direction="right">
            <Row justify="center" align="middle">
              <Col>
                <div className="relative md:pt-32">
                  <h5 className="text-white leading-1rem py-8 font-montserrat">
                    Partners and Sponsors
                  </h5>
                  <p className="my-12">
                    In our commitment to collaboration and mutual growth, we are
                    proud to acknowledge and appreciate the contributions of our
                    valued partners and sponsors.
                  </p>
                  {partnersData.length > 0 ? (
                    <Carousel className="mx-auto w-3/4" showArrows infiniteLoop>
                      {partnersData.map((partner) => (
                        <PartnersList
                          key={partner.id}
                          imageSrc={partner.logoSrc}
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <div className="flex flex-row w-full w-full gap-4 items-center justify-center mt-4 py-4 px-4">
                      <span className="text-2xl body text-feedback-error text-center">
                        Sorry, we haven't partnered with anyone recently!
                      </span>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </FadeAny>
        </section>
      )}
    </Fragment>
  );
};

export default PartnersFrontPage;
