import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from 'antd';
import { Fade } from 'react-awesome-reveal';
import { Carousel } from 'react-responsive-carousel';
import { headers } from '../../utils/headers';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Partner = {
  id: number;
  logoSrc: string;
  title: string;
  date: string;
};

const FadeAny = Fade as any;

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  const fetchPartners = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_CONNECTION}/partners`,
      { headers }
    );
    const { rows } = await res.json();
    setPartners(rows);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <Fragment>
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
                <Carousel className="mx-auto w-3/4" showArrows infiniteLoop>
                  {partners.map((partner) => {
                    return (
                      <div>
                        <img src={partner.logoSrc} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </Col>
          </Row>
        </FadeAny>
      </section>
    </Fragment>
  );
};

export default Partners;
