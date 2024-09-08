import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Rreth nesh</h5>
            <p>Ne jemi nje kompani lider ne tregun e ushqimeve dhe food-delivery. Misioni jone eshte t'u ofrojme klienteve tane nje sherbim korrekt dhe cilesor.</p>
          </Col>
          <Col md={4}>
            <h5>Na kontaktoni</h5>
            <p>Email: contact@foodish.com</p>
            <p>Phone: +355 *** *** ***</p>
            <p>Adresa: Rr.*** Tirane, Shqiperi</p>
          </Col>
          <Col md={4}>
            <h5>Na ndiqni</h5>
            <p>
              <a href="#" className="text-light">Facebook</a><br />
              <a href="#" className="text-light">Twitter</a><br />
              <a href="#" className="text-light">Instagram</a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p>© {new Date().getFullYear()} FooDish. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
