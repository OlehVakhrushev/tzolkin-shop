import React from "react";
import "../styles/custom.css";
import { Container } from "react-bootstrap";

const AboutPage: React.FC = () => {
  return (
    <div className="about-section">
      <Container className="py-5 text-center text-light">
        <h2 className="mb-4">About Our Cacao</h2>

        <div className="cacao-names mb-3">
          <span className="cacao-title">Criollo</span>
          <span className="cacao-title">Forastero</span>
          <span className="cacao-title">Trinitario</span>
        </div>

        <img
          src="/images/about_cacao.png"
          alt="Cacao Varieties"
          className="animated-cacao-image"
        />

        <p className="mt-4">
          Tzolk’in Chocolate is made from the finest cacao varieties, rooted in ancient traditions of the Mayan culture.
        </p>
      </Container>
    </div>
  );
};

export default AboutPage;
