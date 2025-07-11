import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About: React.FC = () => {
  return (
    <Container className="my-5" id="about">
      <Row>
        <Col md={6}>
          <h2>About Us</h2>
          <p>
            We craft chocolate based on ancient Mayan recipes — using cacao mass,
            honey, nuts, and fruits. Only natural ingredients.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="/images/chocolate-about.jpg"
            alt="About Us"
            className="img-fluid rounded"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
